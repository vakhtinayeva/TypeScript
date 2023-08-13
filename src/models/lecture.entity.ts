import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Upload from './upload.entity';
import { Comment } from './comment.entity';
import { Course } from './course.entity';

export enum ContentType {
  VIDEO = 'video',
  IMAGE = 'image',
  TEXT = 'text',
}

@Entity({ name: 'lecture' })
export class Lecture {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 300 })
  name!: string;

  @Column({ type: 'enum', enum: ContentType })
  contentType!: ContentType;

  @OneToOne(() => Upload)
  @JoinColumn()
  upload!: Upload;

  @ManyToOne(() => Course, (course) => course.lectures)
  course!: Course;

  @OneToMany(() => Comment, (comment) => comment.lecture)
  comments!: Comment[];
}
