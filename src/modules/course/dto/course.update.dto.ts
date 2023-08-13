import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { IsEnum } from 'class-validator';
import { ClassTime, ClassDay } from 'src/models/course.entity';
import { Teacher } from 'src/models/teacher.entity';

export class UpdateCourseDto {
  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsEnum(ClassTime)
  time?: ClassTime;

  @ApiProperty()
  @IsEnum(ClassDay)
  day?: ClassDay;

  @ApiProperty()
  @IsDate()
  finalDate?: Date;

  @ApiProperty()
  @IsString()
  teacher?: Teacher;
}
