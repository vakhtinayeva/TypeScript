import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { Assignment } from 'src/models/assignment.entity';
import Upload from 'src/models/upload.entity';
import { UploadService } from '../upload/upload.service';
import { Solution } from 'src/models/solution.entity';
import { Comment } from 'src/models/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, Upload, Comment, Solution])],
  providers: [AssignmentService, UploadService],
  controllers: [AssignmentController],
})
export class AssignmentModule {}
