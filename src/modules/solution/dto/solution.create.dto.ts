import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsEnum } from 'class-validator';
import { Assignment } from 'src/models/assignment.entity';
import { ContentType } from 'src/models/lecture.entity';
import { Student } from 'src/models/student.entity';
import Upload from 'src/models/upload.entity';

export class CreateSolutionDto {
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
  student!: Student;

  @ApiProperty()
  @IsString()
  assignment?: Assignment;
}
