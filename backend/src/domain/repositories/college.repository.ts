import { College } from '@prisma/client';

export abstract class ICollegeRepository {
  abstract findAll(): Promise<College[]>;
  abstract findById(id: number): Promise<College>;
}
