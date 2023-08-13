import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Student } from './student.entity';
import { Assignment } from './assignment.entity';
import { Lecture } from './lecture.entity';
import { Teacher } from './teacher.entity';

export enum ClassTime {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
}

export enum ClassDay {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wedenesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
}

@Entity({ name: 'course' })
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 300 })
  name!: string;

  @Column({ type: 'enum', enum: ClassTime })
  time!: ClassTime;

  @Column({ type: 'enum', enum: ClassDay })
  day!: ClassDay;

  @Column({ type: 'timestamptz' })
  finalDate!: Date;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  teacher!: Teacher;

  @ManyToMany(() => Student)
  @JoinTable()
  students!: Student[];

  @OneToMany(() => Lecture, (lecture) => lecture.course)
  lectures!: Lecture[];

  @OneToMany(() => Assignment, (assignment) => assignment.course)
  assignments!: Assignment[];
}
