import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from '../domain/use-cases/users/create-user.usecase';
import { DatabaseModule } from '../infra/database/prisma/database.module';
import { FindAllUsersUseCase } from '../domain/use-cases/users/findall-user.usecase';
import { AuthenticateUserUseCase } from '../domain/use-cases/users/authenticate-user.usecase';
import { AuthenticateUserController } from './controllers/authenticate.controller';
import { DeleteByIdUserUseCase } from '../domain/use-cases/users/deletebyid-user.usecase';
import { FindByIdUserUseCase } from '../domain/use-cases/users/findbyid-user.usecase';
import { UpdateByIdUserUseCase } from '../domain/use-cases/users/updatebyid-user.usecase';
import { EventController } from './controllers/event.controller';
import { CreateEventUseCase } from 'src/domain/use-cases/events/create-event.usecase';
import { FindAllEventsUseCase } from 'src/domain/use-cases/events/findall-event.usecase';
import { DeleteByIdEventUseCase } from 'src/domain/use-cases/events/deletebyid-event.usecase';
import { FindByIdEventUseCase } from 'src/domain/use-cases/events/findbyid-event.usecase';
import { UpdateByIdEventUseCase } from 'src/domain/use-cases/events/updatebyid-event.usecase';
import { UploadController } from './controllers/upload.controller';
import { CreateUploadUseCase } from '../domain/use-cases/uploads/create-upload.usecase';
import { ArticleController } from './controllers/article.controller';
import { CreateArticleUseCase } from '../domain/use-cases/articles/create-article.usecase';
import { FindAllArticleUseCase } from '../domain/use-cases/articles/findall-article.usecase';
import { FindByIdArticleUseCase } from '../domain/use-cases/articles/findbyid-article.usecase';
import { CollegeController } from './controllers/college.controller';
import { FindAllCollegeUseCase } from '../domain/use-cases/colleges/findall-college.usecase';
import { JwtStrategy } from '../infra/auth/jwt.strategy';
import { GetUsersInfoUseCase } from '../domain/use-cases/users/get-users-info.usecase';
import { UpdateArticleUseCase } from '../domain/use-cases/articles/update-article.usecase';
import { RegisterUserInEventUseCase } from 'src/domain/use-cases/events/register-event.usecase';
import { FindUsersByEventIdUseCase } from '../domain/use-cases/events/findusers-by-eventid.usecase';
import { RegisterArticleUseCase } from '../domain/use-cases/articles/register-article.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [
    UserController,
    AuthenticateUserController,
    EventController,
    UploadController,
    ArticleController,
    CollegeController,
  ],
  providers: [
    JwtStrategy,
    CreateUserUseCase,
    FindAllUsersUseCase,
    AuthenticateUserUseCase,
    DeleteByIdUserUseCase,
    FindByIdUserUseCase,
    UpdateByIdUserUseCase,
    CreateEventUseCase,
    FindAllEventsUseCase,
    DeleteByIdEventUseCase,
    FindByIdEventUseCase,
    UpdateByIdEventUseCase,
    CreateUploadUseCase,
    CreateArticleUseCase,
    FindAllArticleUseCase,
    FindByIdArticleUseCase,
    FindAllCollegeUseCase,
    GetUsersInfoUseCase,
    UpdateArticleUseCase,
    RegisterUserInEventUseCase,
    FindUsersByEventIdUseCase,
    RegisterArticleUseCase,
  ],
  exports: [],
})
export class HttpModule {}
