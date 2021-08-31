import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { ValidStatusRule } from '../validators/task-status.validator';

export class GetTaskFilterDto {
  @IsOptional()
  @Validate(ValidStatusRule)
  status: string;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
