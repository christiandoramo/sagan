import { Injectable } from '@nestjs/common';
import { IUploadRepository } from '../../../../domain/repositories/upload.repository';
import { Upload, UploadType } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UploadPrismaRepository implements IUploadRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    id: string,
    storageId: string,
    filename: string,
    url: string,
    uploadType: UploadType,
    extension: string,
  ): Promise<Upload> {
    return await this.prisma.upload.create({
      data: {
        id,
        storageId,
        filename,
        url,
        uploadType,
        extension,
      },
    });
  }
}
