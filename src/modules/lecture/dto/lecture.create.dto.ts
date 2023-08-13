import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsEnum } from 'class-validator';
import { Course } from 'src/models/course.entity';
import { ContentType } from 'src/models/lecture.entity';
import Upload from 'src/models/upload.entity';

export class CreateLectureDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsEnum(ContentType)
  contentType?: ContentType;

  @ApiProperty()
  @IsString()
  upload?: Upload;

  @ApiProperty()
  @IsString()
  course?: Course;
}
