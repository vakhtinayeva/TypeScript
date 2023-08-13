import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { IsEmail } from 'class-validator';
import { Year } from 'src/models/student.entity';

export class UpdateStudentDto {
  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsString()
  middleName?: string;

  @ApiProperty()
  @IsString()
  faculty?: string;

  @ApiProperty()
  @IsString()
  department?: string;

  @ApiProperty()
  @IsEnum(Year)
  year?: Year;

  @ApiProperty()
  @IsString()
  group?: string;
}
