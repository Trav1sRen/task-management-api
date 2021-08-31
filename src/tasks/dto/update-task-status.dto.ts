import { IsNotEmpty, Validate } from 'class-validator';
import { ValidStatusRule } from '../validators/task-status.validator';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @Validate(ValidStatusRule)
  status: string;
}
