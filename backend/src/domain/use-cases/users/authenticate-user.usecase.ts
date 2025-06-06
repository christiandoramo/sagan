import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../repositories/user.repository';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from '../../../http/controllers/authenticate.controller';
import { Response } from 'express';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwt: JwtService,
  ) {}

  async execute({ email, password }: UserAuthDto, response: Response) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorreto(s)');
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      throw new UnauthorizedException('Email e/ou senha incorreto(s)');
    }

    const accessToken = this.jwt.sign(
      {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      {
        audience: 'users',
        issuer: 'sagan',
      },
    );

    response.cookie('@SAGAN_ACCESS_TOKEN', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 15, // 15 minutes
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
