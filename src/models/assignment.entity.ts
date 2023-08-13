import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Upload from './upload.entity';
import { Teacher } from './teacher.entity';
import { Comment } from './comment.entity';
import { Course } from './course.entity';
import { Solution } from './solution.entity';

export enum ContentType {
  VIDEO = 'video',
  IMAGE = 'image',
  TEXT = 'text',
}

@Entity({ name: 'assignment' })
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 300 })
  name!: string;

  @Column({ type: 'varchar', length: 300 })
  task!: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDateTime!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedDateTime!: Date;

  @Column({ type: 'enum', enum: ContentType })
  contentType!: ContentType;

  @OneToOne(() => Upload)
  @JoinColumn()
  upload!: Upload;

  @Column({ type: 'boolean' })
  final!: boolean;

  @Column({ type: 'integer' })
  maxGrade!: number;

  @Column({ type: 'timestamptz' })
  deadline!: Date;

  @ManyToOne(() => Teacher, (teacher) => teacher.assignments)
  teacher!: Teacher;

  @ManyToOne(() => Course, (course) => course.assignments)
  course!: Course;

  @OneToMany(() => Solution, (solution) => solution.assignment)
  solutions!: Solution[];

  @OneToMany(() => Comment, (comment) => comment.assignment)
  comments!: Comment[];
}
