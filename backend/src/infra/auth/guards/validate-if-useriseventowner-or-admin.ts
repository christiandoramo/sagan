import { FindByIdUserUseCase } from './../../../domain/use-cases/users/findbyid-user.usecase';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtStrategy } from '../jwt.strategy';
@Injectable()
export class ValidateIsUserIsEventOwnerOrAdmin implements CanActivate {
  constructor(
    private readonly jwtStrategy: JwtStrategy,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers;

    if (!auth.cookie) throw new UnauthorizedException('Você não está logado');

    const [, token] = auth.cookie.split('@SAGAN_ACCESS_TOKEN=');

    try {
      const user = await this.jwtStrategy.checkToken(token);

      const events = ((await this.findByIdUserUseCase.execute(user.sub)) as any)
        .events;

      console.log(events);

      if (
        events.some(
          (event) =>
            event.eventId === request.params.id && event.role === 'OWNER',
        ) ||
        user.role === 'ADMIN'
      ) {
        return true;
      }

      throw new ForbiddenException(
        'Você não tem permissão para acessar este recurso',
      );
    } catch (e) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este recurso',
      );
    }
  }
}
