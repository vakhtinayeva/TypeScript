import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateSolutionDto {
  @ApiProperty()
  @IsNumber()
  grade!: number;
}
