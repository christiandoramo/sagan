import { PrismaService } from '../prisma.service';
import { College } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ICollegeRepository } from '../../../../domain/repositories/college.repository';

@Injectable()
export class CollegePrismaRepository implements ICollegeRepository {
  constructor(private prisma: PrismaService) {}
  findById(id: number): Promise<College> {
    return this.prisma.college.findFirst({ where: { id } });
  }

  async findAll(): Promise<College[]> {
    return await this.prisma.college.findMany();
  }
}
