import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;
}
