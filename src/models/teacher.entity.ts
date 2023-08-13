import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';
import { Assignment } from './assignment.entity';
import { Comment } from './comment.entity';

@Entity({ name: 'teacher' })
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 300 })
  email!: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  firstName?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  middleName?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  academicRank?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  faculty?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  department?: string;

  @OneToMany(() => Course, (course) => course.teacher)
  courses?: Course[];

  @OneToMany(() => Assignment, (assignment) => assignment.teacher)
  assignments?: Assignment[];

  @OneToMany(() => Comment, (comment) => comment.teacher)
  comments?: Comment[];
}
