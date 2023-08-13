import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolutionService } from './solution.service';
import { SolutionController } from './solution.controller';
import { Solution } from 'src/models/solution.entity';
import Upload from 'src/models/upload.entity';
import { UploadService } from '../upload/upload.service';
import { Comment } from 'src/models/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solution, Upload, Comment])],
  providers: [SolutionService, UploadService],
  controllers: [SolutionController],
})
export class SolutionModule {}
