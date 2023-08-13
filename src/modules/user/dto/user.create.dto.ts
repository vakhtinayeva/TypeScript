import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsEmail } from 'class-validator';
import { UserRole } from 'src/models/user.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsEnum(UserRole)
  role!: UserRole;
}
