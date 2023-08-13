import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { User, UserRole } from 'src/models/user.entity';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import { UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/role.auth.guard';
import { Roles } from '../auth/role.decorator';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return user' })
  @Get(':id')
  @ApiBearerAuth('access-token')
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User | null> {
    return await this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'Create user' })
  @Post()
  @ApiBearerAuth('access-token')
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return await this.userService.createUser(data);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'Update user' })
  @Patch(':id')
  @ApiBearerAuth('access-token')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userService.updateUser(id, data);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'Delete user' })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
