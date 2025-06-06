import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtStrategy } from '../jwt.strategy';
@Injectable()
export class ValidateIsUserSelfOrAdmin implements CanActivate {
  constructor(private readonly jwtStrategy: JwtStrategy) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers;

    if (!auth.cookie) throw new UnauthorizedException('Você não está logado');

    const [, token] = auth.cookie.split('@SAGAN_ACCESS_TOKEN=');

    try {
      const user = await this.jwtStrategy.checkToken(token);

      if (!(user.sub === request.params.id) && !(user.role === 'ADMIN')) {
        throw new ForbiddenException(
          'Você não tem permissão para acessar este recurso',
        );
      }

      return true;
    } catch (e) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este recurso',
      );
    }
  }
}
