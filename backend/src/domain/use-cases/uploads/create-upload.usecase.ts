import { BadRequestException, Injectable } from '@nestjs/common';
import { IUploadRepository } from '../../repositories/upload.repository';
import { randomUUID } from 'node:crypto';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { UploadType } from '@prisma/client';

@Injectable()
export class CreateUploadUseCase {
  constructor(
    private uploadRepository: IUploadRepository,
    private configService: ConfigService,
  ) {}

  private readonly s3Client = new AWS.S3({
    endpoint: this.configService.getOrThrow('AWS_ENDPOINT'),
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
    secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
  });

  async execute(file: Express.Multer.File, uploadType?: UploadType) {
    {
      try {
        const uuid = randomUUID();
        const extension = file.mimetype.substring(
          file.mimetype.lastIndexOf('/') + 1,
        );
        const result = await this.s3Client
          .upload({
            Bucket: `${this.configService.getOrThrow('AWS_BUCKET')}/sagan`,
            Key: `${uuid}.${extension}`,
            Body: file.buffer,
            ACL: 'public-read',
          })
          .promise();

        const upload = await this.uploadRepository.create(
          `${uuid}`, // id
          `${uuid}.${extension}`, // storageId
          file.originalname, // filename
          result.Location, // url
          uploadType, // uploadType (substitua UploadType.Document pelo valor correto)
          extension, // extension
        );

        return upload;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
