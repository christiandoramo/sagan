import { Upload, UploadType } from '@prisma/client';

export abstract class IUploadRepository {
  abstract create(
    id: string,
    storageId: string,
    filename: string,
    url: string,
    uploadType: UploadType,
    extension: string,
  ): Promise<Upload>;
}
