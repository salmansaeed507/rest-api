import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  public createTask(user_id: number, data: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.name = data.name;
    task.user_id = user_id;
    return this.taskRepository.save(task);
  }

  public getTasks(user_id: number): Promise<Task[]> {
    return this.taskRepository.findBy({
      user_id: user_id,
    });
  }
}
