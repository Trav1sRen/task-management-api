import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from 'src/auth/user.entity';
import { TaskStatusRepository } from './task.status.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
    @InjectRepository(TaskStatusRepository)
    private taskStatusRepository: TaskStatusRepository,
  ) {}

  getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  getStatusDict() {
    return this.taskStatusRepository.getStatusDict();
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatusById(
    id: number,
    statusName: string,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    const { statusId } = (
      await this.taskStatusRepository.find({ statusName })
    )[0];
    task.status = statusId;
    await task.save();

    return task;
  }
}
