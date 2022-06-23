import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create-task')
  async createTask(
    @Req() req: any,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<{ task: Task }> {
    const task = await this.taskService.createTask(req.user.id, createTaskDto);
    return { task };
  }

  @Get('list-tasks')
  async getTasks(@Req() req: any): Promise<{ tasks: Task[] }> {
    const tasks: Task[] = await this.taskService.getTasks(req.user.id);
    return { tasks };
  }
}
