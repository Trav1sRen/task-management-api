import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatusRepository } from '../task.status.repository';

export class GetTaskFilterDto {
  constructor(
    @InjectRepository(TaskStatusRepository)
    private taskStatusRepository: TaskStatusRepository,
  ) {}

  @IsOptional()
  @IsIn()
  status: string;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
