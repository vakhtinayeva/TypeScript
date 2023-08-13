import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Assignment } from 'src/models/assignment.entity';
import { Lecture } from 'src/models/lecture.entity';
import { Solution } from 'src/models/solution.entity';
import { Student } from 'src/models/student.entity';
import { Teacher } from 'src/models/teacher.entity';

export class CreateCommentDto {
  @ApiProperty()
  @IsEmail()
  text!: string;

  @ApiProperty()
  @IsString()
  teacher?: Teacher;

  @ApiProperty()
  @IsString()
  student?: Student;

  @ApiProperty()
  @IsString()
  lecture?: Lecture;

  @ApiProperty()
  @IsString()
  assignment?: Assignment;

  @ApiProperty()
  @IsString()
  solution?: Solution;
}
