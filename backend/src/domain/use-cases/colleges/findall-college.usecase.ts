import { Injectable } from '@nestjs/common';
import { ICollegeRepository } from '../../repositories/college.repository';

@Injectable()
export class FindAllCollegeUseCase {
  constructor(private collegeRepository: ICollegeRepository) {}

  async execute() {
    const colleges = await this.collegeRepository.findAll();

    return colleges;
  }
}
