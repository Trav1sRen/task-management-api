import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TaskStatusRepository } from '../task.status.repository';
import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'ValidStatus', async: true })
@Injectable()
export class ValidStatusRule implements ValidatorConstraintInterface {
  constructor(private taskStatusRepository: TaskStatusRepository) {}

  async validate(statusName: string) {
    const found = await this.taskStatusRepository.find({ statusName });

    return !_.isEmpty(found);
  }

  defaultMessage({ value }: ValidationArguments) {
    return `'${value}' is not a valid status`;
  }
}
