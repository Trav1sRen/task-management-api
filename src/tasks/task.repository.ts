import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from 'src/auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { TaskStatus } from './task.status.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger(TaskRepository.name);

  async getTasks(
    { status, search }: GetTaskFilterDto,
    { id, username }: User,
  ): Promise<Task[]> {
    const query = this.createQueryBuilder('task')
      .leftJoinAndSelect(
        TaskStatus,
        'task_status',
        'task.status = task_status.statusId',
      )
      .andWhere('task.userId = :id', { id });

    if (status) {
      query.andWhere('task_status.statusName = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    query.orderBy({ 'task.status': 'ASC', 'task.title': 'ASC' });

    try {
      return await query.getMany();
    } catch (err) {
      this.logger.error(
        `Failed to get tasks for user "${username}". Filter: ${JSON.stringify({
          status,
          search,
        })}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(
    { title, description }: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = 0;
    task.user = user;

    try {
      await task.save();
    } catch (err) {
      this.logger.error(
        `Failed to create a task for user "${
          user.username
        }". Data: ${JSON.stringify({ task, description })}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }

    delete task.user;

    return task;
  }
}
