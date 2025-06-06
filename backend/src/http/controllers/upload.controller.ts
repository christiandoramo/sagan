import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUploadUseCase } from '../../domain/use-cases/uploads/create-upload.usecase';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../infra/auth/guards/jwt.auth.guard';
import { Roles } from '../../infra/auth/decorators/role.decorator';
import { Authority } from '../../infra/auth/authority.enum';

@ApiTags('uploads')
@Controller('uploads')
@UseGuards(AuthGuard)
@Roles(Authority.ADMIN)
export class UploadController {
  constructor(private readonly createUploadUseCase: CreateUploadUseCase) {}

  // @Get()
  // async getAllFiles() {
  //   return await this.uploadService.getAllFiles();
  // }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.createUploadUseCase.execute(file);
  }

  // @HttpCode(204)
  // @Delete(':file')
  // async deleteFile(
  //   @Param('file') file: string,
  //   @Query('folder') folder: string,
  // ) {
  //   return await this.uploadService.deleteFile(file, folder);
  // }
}
