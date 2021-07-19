import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any): any {
    if (!this.isStatusValid(value.toUpperCase())) {
      throw new BadRequestException(`"${value}" is not a valid status`);
    }

    return value;
  }

  private isStatusValid(status) {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
