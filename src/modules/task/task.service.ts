import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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

  public getTasks(user_id: number, name?: string): Promise<Task[]> {
    const where = [
      {
        user_id: user_id,
        name: Like(name ? '%' + name + '%' : '%%'),
      },
    ];
    return this.taskRepository.findBy(where);
  }
}
