import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Student } from './student.entity';
import { Lecture } from './lecture.entity';
import { Assignment } from './assignment.entity';
import { Solution } from './solution.entity';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  text!: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.comments)
  teacher!: Teacher;

  @ManyToOne(() => Student, (student) => student.comments)
  student!: Student;

  @ManyToOne(() => Lecture, (lecture) => lecture.comments)
  lecture!: Lecture;

  @ManyToOne(() => Assignment, (assignment) => assignment.comments)
  assignment!: Assignment;

  @ManyToOne(() => Solution, (solution) => solution.comments)
  solution!: Solution;
}
