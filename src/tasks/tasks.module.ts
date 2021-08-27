import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { TaskStatusRepository } from './task.status.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository, TaskStatusRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    /**
     * Have to import AuthModule becos JwtStrategy is the provider of AuthModule,
     * otherwise the validate() method in JwtStrategy won't be triggered
     */
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
