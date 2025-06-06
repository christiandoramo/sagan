import { Controller, Get } from '@nestjs/common';
import { z } from 'nestjs-zod/z';
import { zodToOpenAPI } from 'nestjs-zod';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllCollegeUseCase } from '../../domain/use-cases/colleges/findall-college.usecase';

@ApiTags('colleges')
@Controller('colleges')
export class CollegeController {
  constructor(private findAllCollegesUseCase: FindAllCollegeUseCase) {}

  @ApiResponse({
    schema: zodToOpenAPI(
      z.array(z.object({ id: z.number(), name: z.string(), uf: z.string() })),
    ),
  })
  @Get()
  async findAllColleges() {
    return await this.findAllCollegesUseCase.execute();
  }
}
