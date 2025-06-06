import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { z } from 'nestjs-zod/z';
import { CreateEventUseCase } from '../../domain/use-cases/events/create-event.usecase';
import { FindAllEventsUseCase } from '../../domain/use-cases/events/findall-event.usecase';
import { FindByIdEventUseCase } from '../../domain/use-cases/events/findbyid-event.usecase';
import { DeleteByIdEventUseCase } from '../../domain/use-cases/events/deletebyid-event.usecase';
import { UpdateByIdEventUseCase } from '../../domain/use-cases/events/updatebyid-event.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventRole } from '@prisma/client';
import { createZodDto, zodToOpenAPI } from 'nestjs-zod';
import { AuthGuard } from '../../infra/auth/guards/jwt.auth.guard';
import { Roles } from '../../infra/auth/decorators/role.decorator';
import { Authority } from '../../infra/auth/authority.enum';
import { ValidateIsUserIsEventOwnerOrAdmin } from '../../infra/auth/guards/validate-if-useriseventowner-or-admin';
import { FindUsersByEventIdUseCase } from '../../domain/use-cases/events/findusers-by-eventid.usecase';
import { RegisterUserInEventUseCase } from '../../domain/use-cases/events/register-event.usecase';

const createEventDtoSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  roles: z
    .array(
      z.enum([EventRole.ORGANIZER, EventRole.OWNER, EventRole.PARTICIPANT]),
    )
    .or(
      z
        .string(
          z.enum([EventRole.ORGANIZER, EventRole.OWNER, EventRole.PARTICIPANT]),
        )
        .transform((value) => [value]),
    )
    .default([EventRole.PARTICIPANT]),
  uploadId: z.string().default(undefined).optional(),
  usersIds: z
    .array(z.string().uuid())
    .or(
      z
        .string()
        .uuid()
        .transform((value) => [value]),
    )
    .optional()
    .default(undefined),
  criterias: z.string(),
});

const updateEventDtoSchema = z.object({
  title: z.string().optional().default(undefined),
  description: z.string().optional().default(undefined),
  category: z.string().optional().default(undefined),
  startDate: z.string().optional().default(undefined),
  endDate: z.string().optional().default(undefined),
  usersIds: z
    .array(z.string().uuid())
    .or(
      z
        .string()
        .uuid()
        .transform((value) => [value]),
    )
    .optional()
    .default(undefined),
  roles: z
    .array(
      z.enum([EventRole.ORGANIZER, EventRole.OWNER, EventRole.PARTICIPANT]),
    )
    .or(
      z
        .string(
          z.enum([EventRole.ORGANIZER, EventRole.OWNER, EventRole.PARTICIPANT]),
        )
        .transform((value) => [value]),
    )
    .default([EventRole.PARTICIPANT])
    .optional(),
  criterias: z.string().optional().default(undefined),
  uploadId: z.string().optional().default(undefined),
});

const registerEventDtoSchema = z.object({
  usersIds: z
    .array(z.string().uuid())
    .or(
      z
        .string()
        .uuid()
        .transform((value) => [value]),
    )
    .optional()
    .default(undefined),
  roles: z
    .array(
      z.enum([EventRole.ORGANIZER, EventRole.OWNER, EventRole.PARTICIPANT]),
    )
    .or(
      z
        .string(
          z.enum([EventRole.ORGANIZER, EventRole.OWNER, EventRole.PARTICIPANT]),
        )
        .transform((value) => [value]),
    )
    .default([EventRole.PARTICIPANT])
    .optional(),
});

const returnSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  uploadId: z.string().uuid().optional(),
  criterias: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  banner: z.string().optional(),
  users: z.array(
    z.object({
      id: z.string().uuid(),
      userId: z.string().uuid(),
      eventId: z.string().uuid(),
      role: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  ),
});

const createEventBodyValidationPipe = new ZodValidationPipe(
  createEventDtoSchema,
);
const updateEventBodyValidationPipe = new ZodValidationPipe(
  updateEventDtoSchema,
);

const registerEventBodyValidationPipe = new ZodValidationPipe(
  registerEventDtoSchema,
);

export class CreateEventDtoSchema extends createZodDto(createEventDtoSchema) {}
export type UpdateEventDtoSchema = z.infer<typeof updateEventDtoSchema>;
export type RegisterEventDtoSchema = z.infer<typeof registerEventDtoSchema>;

@UseGuards(AuthGuard)
@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(
    private createEventUseCase: CreateEventUseCase,
    private findAllEventsUseCase: FindAllEventsUseCase,
    private findEventByIdUseCase: FindByIdEventUseCase,
    private deleteEventByIdUseCase: DeleteByIdEventUseCase,
    private updateEventByIdUseCase: UpdateByIdEventUseCase,
    private findUsersByEventIdUseCase: FindUsersByEventIdUseCase,
    private registerUserInEventUseCase: RegisterUserInEventUseCase,
  ) {}

  @ApiBody({
    schema: zodToOpenAPI(createEventDtoSchema),
  })
  @ApiResponse({
    schema: zodToOpenAPI(returnSchema),
  })
  @Roles(Authority.ADMIN, Authority.TECH_MANAGER, Authority.PROFESSOR)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createEvent(
    @Body(createEventBodyValidationPipe) body: CreateEventDtoSchema,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const {
      title,
      description,
      category,
      startDate,
      endDate,
      usersIds,
      uploadId,
      roles,
      criterias,
    } = body;

    return await this.createEventUseCase.execute(
      {
        title,
        description,
        category,
        startDate,
        endDate,
        usersIds,
        uploadId,
        roles,
        criterias,
      },
      file,
    );
  }

  @Get('users/:eventId')
  async findEventsByUserId(@Param('eventId') eventId: string) {
    return await this.findUsersByEventIdUseCase.execute(eventId);
  }

  @Get()
  async findAllEvents() {
    return await this.findAllEventsUseCase.execute();
  }

  @Get(':id')
  async findEventById(@Param('id') id: string) {
    return await this.findEventByIdUseCase.execute(id);
  }

  @UseGuards(ValidateIsUserIsEventOwnerOrAdmin)
  @Delete(':id')
  @HttpCode(204)
  async deleteEventById(@Param('id') id: string) {
    await this.deleteEventByIdUseCase.execute(id);
  }

  @UseGuards(ValidateIsUserIsEventOwnerOrAdmin)
  @Patch(':id')
  async updateEventById(
    @Param('id') id: string,
    @Body(updateEventBodyValidationPipe) body: UpdateEventDtoSchema,
  ) {
    return await this.updateEventByIdUseCase.execute(id, body);
  }

  @Patch('add-user/:id')
  async registerEventById(
    @Param('id') id: string,
    @Body(registerEventBodyValidationPipe) body: RegisterEventDtoSchema,
  ) {
    return await this.registerUserInEventUseCase.execute(id, body);
  }
}
