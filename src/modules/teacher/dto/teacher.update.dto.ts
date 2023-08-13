import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsEmail } from 'class-validator';

export class UpdateTeacherDto {
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
  academicRank?: string;

  @ApiProperty()
  @IsString()
  faculty?: string;

  @ApiProperty()
  @IsString()
  department?: string;
}
