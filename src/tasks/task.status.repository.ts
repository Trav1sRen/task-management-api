import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './task.status.entity';

@EntityRepository(TaskStatus)
export class TaskStatusRepository extends Repository<TaskStatus> {
  async getStatusDict(): Promise<{ [key: number]: string }> {
    const statusDict = {};

    (await this.find()).forEach(
      ({ statusId, statusName }) => (statusDict[statusId] = statusName),
    );

    return statusDict;
  }
}
