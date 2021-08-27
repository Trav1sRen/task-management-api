import { BadRequestException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatusRepository } from '../task.status.repository';
import * as _ from 'lodash';

export class TaskStatusValidationPipe implements PipeTransform {
  constructor(
    @InjectRepository(TaskStatusRepository)
    private taskStatusRepository: TaskStatusRepository,
  ) {}

  transform(statusName: string): string {
    const found = this.taskStatusRepository.find({ statusName });

    if (_.isEmpty(found)) {
      throw new BadRequestException(`"${statusName}" is not a valid status`);
    }

    return statusName;
  }
}
