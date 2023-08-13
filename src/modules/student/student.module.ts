import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from 'src/models/Student.entity';
import { CourseService } from '../course/course.service';
import { AssignmentService } from '../assignment/assignment.service';
import { Course } from 'src/models/course.entity';
import { Assignment } from 'src/models/assignment.entity';
import { Lecture } from 'src/models/lecture.entity';
import { UploadService } from '../upload/upload.service';
import { Comment } from 'src/models/comment.entity';
import { Solution } from 'src/models/solution.entity';
import Upload from 'src/models/upload.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      Course,
      Assignment,
      Lecture,
      Comment,
      Solution,
      Upload,
    ]),
  ],
  providers: [StudentService, CourseService, AssignmentService, UploadService],
  controllers: [StudentController],
})
export class StudentModule {}
