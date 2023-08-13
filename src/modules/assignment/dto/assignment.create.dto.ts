import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { IsEnum } from 'class-validator';
import { Course } from 'src/models/course.entity';
import { ContentType } from 'src/models/lecture.entity';
import { Teacher } from 'src/models/teacher.entity';
import Upload from 'src/models/upload.entity';

export class CreateAssignmentDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  task!: string;

  @ApiProperty()
  @IsEnum(ContentType)
  contentType?: ContentType;

  @ApiProperty()
  @IsString()
  upload?: Upload;

  @ApiProperty()
  @IsBoolean()
  final!: boolean;

  @ApiProperty()
  @IsNumber()
  maxGrade!: number;

  @ApiProperty()
  @IsDate()
  deadline!: Date;

  @ApiProperty()
  @IsString()
  teacher!: Teacher;

  @ApiProperty()
  @IsString()
  course?: Course;
}
