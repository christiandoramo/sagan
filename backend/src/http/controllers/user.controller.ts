import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { z } from 'nestjs-zod/z';
import { CreateUserUseCase } from '../../domain/use-cases/users/create-user.usecase';
import { FindAllUsersUseCase } from '../../domain/use-cases/users/findall-user.usecase';
import { FindByIdUserUseCase } from '../../domain/use-cases/users/findbyid-user.usecase';
import { DeleteByIdUserUseCase } from '../../domain/use-cases/users/deletebyid-user.usecase';
import { UpdateByIdUserUseCase } from '../../domain/use-cases/users/updatebyid-user.usecase';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../infra/auth/guards/jwt.auth.guard';
import { ValidateIsUserSelfOrAdmin } from '../../infra/auth/guards/validate-is-userself-or-admin.guard';
import { UserRole } from '@prisma/client';
import { Roles } from '../../infra/auth/decorators/role.decorator';
import { Authority } from '../../infra/auth/authority.enum';
import { Throttle } from '@nestjs/throttler';
import { GetUsersInfoUseCase } from '../../domain/use-cases/users/get-users-info.usecase';
import { PrismaService } from '../../infra/database/prisma/prisma.service';

const createUserDtoSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  collegeId: z.number(),
  role: z
    .enum([UserRole.STUDENT, UserRole.PROFESSOR])
    .optional()
    .default(UserRole.STUDENT),
});

const updateUserDtoSchema = z.object({
  name: z.string().optional().default(undefined),
  email: z.string().email().optional().default(undefined),
  password: z.string().optional().default(undefined),
  collegeId: z.number().optional().default(undefined),
  role: z
    .enum([UserRole.STUDENT, UserRole.PROFESSOR])
    .optional()
    .default(undefined),
});

const createUserBodyValidationPipe = new ZodValidationPipe(createUserDtoSchema);
const updateUserBodyValidationPipe = new ZodValidationPipe(updateUserDtoSchema);

export type CreateUserDtoSchema = z.infer<typeof createUserDtoSchema>;
export type UpdateUserDtoSchema = z.infer<typeof updateUserDtoSchema>;

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findAllUsersUseCase: FindAllUsersUseCase,
    private findUserByIdUseCase: FindByIdUserUseCase,
    private deleteUserByIdUseCase: DeleteByIdUserUseCase,
    private updateUserByIdUseCase: UpdateByIdUserUseCase,
    private getUsersInfoUseCase: GetUsersInfoUseCase,
    private prisma: PrismaService,
  ) {}

  @Throttle({ default: { limit: 3, ttl: 90000 } })
  @Post()
  async createUser(
    @Body(createUserBodyValidationPipe) body: CreateUserDtoSchema,
  ) {
    const { name, email, password, role, collegeId } = body;

    return await this.createUserUseCase.execute({
      name,
      email,
      password,
      role,
      collegeId,
    });
  }

  @UseGuards(AuthGuard)
  @Get('list')
  async getUsersInfo() {
    return await this.getUsersInfoUseCase.execute();
  }

  @UseGuards(AuthGuard)
  @Roles(Authority.ADMIN, Authority.TECH_MANAGER)
  @Get()
  async findAllUsers() {
    return await this.findAllUsersUseCase.execute();
  }

  @UseGuards(AuthGuard)
  @UseGuards(ValidateIsUserSelfOrAdmin)
  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return await this.findUserByIdUseCase.execute(id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(ValidateIsUserSelfOrAdmin)
  @Delete(':id')
  @HttpCode(204)
  async deleteUserById(@Param('id') id: string) {
    await this.deleteUserByIdUseCase.execute(id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(ValidateIsUserSelfOrAdmin)
  @Patch(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body(updateUserBodyValidationPipe) body: UpdateUserDtoSchema,
  ) {
    return await this.updateUserByIdUseCase.execute(id, body);
  }

  @Get('all/professors')
  async findAllProfessors() {
    return await this.prisma.user.findMany({
      where: {
        role: UserRole.PROFESSOR,
      },
    });
  }
}
