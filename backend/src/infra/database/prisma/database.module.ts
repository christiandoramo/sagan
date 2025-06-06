import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { UserPrismaRepository } from './repositories/user-prisma.repository';
import { IEventRepository } from '../../../domain/repositories/event.repository';
import { EventPrismaRepository } from './repositories/event-prisma.repository';
import { IUploadRepository } from '../../../domain/repositories/upload.repository';
import { UploadPrismaRepository } from './repositories/upload-prisma.repository';
import { IArticleRepository } from '../../../domain/repositories/article.repository';
import { ArticlePrismaRepository } from './repositories/article-prisma.repository';
import { ICollegeRepository } from '../../../domain/repositories/college.repository';
import { CollegePrismaRepository } from './repositories/college-prisma.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IEventRepository,
      useClass: EventPrismaRepository,
    },
    {
      provide: IUploadRepository,
      useClass: UploadPrismaRepository,
    },
    {
      provide: IArticleRepository,
      useClass: ArticlePrismaRepository,
    },
    {
      provide: ICollegeRepository,
      useClass: CollegePrismaRepository,
    },
  ],
  exports: [
    IUserRepository,
    IEventRepository,
    IUploadRepository,
    IArticleRepository,
    ICollegeRepository,
    PrismaService,
  ],
})
export class DatabaseModule {}
