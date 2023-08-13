import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course } from 'src/models/course.entity';
import { Assignment } from 'src/models/assignment.entity';
import { Lecture } from 'src/models/lecture.entity';
import { UploadService } from '../upload/upload.service';
import Upload from 'src/models/upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Lecture, Assignment, Upload])],
  providers: [CourseService, UploadService],
  controllers: [CourseController],
})
export class CourseModule {}
