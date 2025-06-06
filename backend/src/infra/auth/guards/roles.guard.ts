import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { Authority } from '../authority.enum';
import { ROLES_KEY } from '../decorators/role.decorator';
import { FindByIdUserUseCase } from '../../../domain/use-cases/users/findbyid-user.usecase';
import { JwtStrategy } from '../jwt.strategy';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Authority[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const auth = request.headers;

    if (!auth.cookie) throw new UnauthorizedException('Você não está logado');

    const [, token] = auth.cookie.split('@SAGAN_ACCESS_TOKEN=');

    const data = this.jwtStrategy.checkToken(token);
    request.token = data;

    const user = await this.findByIdUserUseCase.execute(data.sub);
    const filteredRoles = requiredRoles.find((role) => user.role === role);

    if (!filteredRoles) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este recurso',
      );
    }

    return true;
  }
}
