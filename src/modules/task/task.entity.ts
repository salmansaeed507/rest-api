import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  user_id: number;
}
