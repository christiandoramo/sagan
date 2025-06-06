import { z } from 'nestjs-zod/z';
import { AuthenticateUserUseCase } from '../../domain/use-cases/users/authenticate-user.usecase';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ZodValidationPipe, createZodDto, zodToOpenAPI } from 'nestjs-zod';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Throttle } from '@nestjs/throttler';

const authBodySchema = z.object({
  email: z.string().email().describe('User email'),
  password: z.string().describe('User password'),
});

const returnSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
  }),
  accessToken: z.string(),
});

export class UserAuthDto extends createZodDto(authBodySchema) {}

const authBodyValidationPipe = new ZodValidationPipe(authBodySchema);

@Throttle({ default: { limit: 7, ttl: 60000 } })
@ApiTags('auth')
@Controller('auth')
export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @ApiBody({
    schema: zodToOpenAPI(authBodySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(returnSchema),
  })
  @Post()
  async authenticate(
    @Body(authBodyValidationPipe) body: UserAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = body;

    const user = await this.authenticateUserUseCase.execute(
      {
        email,
        password,
      },
      response,
    );

    return user;
  }
}
