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
import { Comment } from './comment.entity';
import { Student } from './student.entity';
import { Assignment } from './assignment.entity';

export enum ContentType {
  VIDEO = 'video',
  IMAGE = 'image',
  TEXT = 'text',
}

@Entity({ name: 'solution' })
export class Solution {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 300 })
  name!: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDateTime!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedDateTime!: Date;

  @Column({ type: 'enum', enum: ContentType })
  contentType!: ContentType;

  @OneToOne(() => Upload)
  @JoinColumn()
  upload!: Upload;

  @Column({ type: 'integer' })
  grade!: number;

  @ManyToOne(() => Student, (student) => student.solutions)
  student!: Student;

  @ManyToOne(() => Assignment, (assignment) => assignment.solutions)
  assignment!: Assignment;

  @OneToMany(() => Comment, (comment) => comment.solution)
  comments!: Comment[];
}
