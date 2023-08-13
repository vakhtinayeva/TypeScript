import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Solution } from './solution.entity';
import { Comment } from './comment.entity';

export enum Year {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
  FOURTH = 'fourth',
}

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 300 })
  email!: string;

  @Column({ type: 'varchar', length: 300 })
  firstName!: string;

  @Column({ type: 'varchar', length: 300 })
  lastName!: string;

  @Column({ type: 'varchar', length: 300 })
  middleName!: string;

  @Column({ type: 'varchar', length: 300 })
  faculty!: string;

  @Column({ type: 'varchar', length: 300 })
  department!: string;

  @Column({ type: 'enum', enum: Year })
  year!: Year;

  @Column({ type: 'varchar', length: 300 })
  group!: string;

  @OneToMany(() => Solution, (solution) => solution.student)
  solutions!: Solution[];

  @OneToMany(() => Comment, (comment) => comment.student)
  comments!: Comment[];
}
