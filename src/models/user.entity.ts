import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 300 })
  email!: string;

  @Column({ type: 'enum', enum: UserRole })
  role!: UserRole;
}
