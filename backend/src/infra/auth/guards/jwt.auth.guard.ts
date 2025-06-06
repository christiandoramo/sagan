import { JwtStrategy } from '../jwt.strategy';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtStrategy: JwtStrategy) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers;

    if (!auth.cookie) throw new UnauthorizedException('Você não está logado');

    try {
      const [, token] = auth.cookie.split('@SAGAN_ACCESS_TOKEN=');

      if (!token) {
        throw new UnauthorizedException('Você não está logado');
      }
      const data = this.jwtStrategy.checkToken(token);

      request.token = data;

      return true;
    } catch (e) {
      throw new UnauthorizedException('Você não está logado');
    }
  }
}
