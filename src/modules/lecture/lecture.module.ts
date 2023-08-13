import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { Lecture } from 'src/models/lecture.entity';
import Upload from 'src/models/upload.entity';
import { UploadService } from '../upload/upload.service';
import { Comment } from 'src/models/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture, Upload, Comment])],
  providers: [LectureService, UploadService],
  controllers: [LectureController],
})
export class LectureModule {}
