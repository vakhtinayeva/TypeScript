import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Upload from 'src/models/upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Upload])],
  providers: [UploadService],
  controllers: [],
})
export class UploadModule {}
