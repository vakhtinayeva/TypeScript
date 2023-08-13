import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TeacherService } from './teacher.service';
import { Teacher } from 'src/models/teacher.entity';
import { UpdateTeacherDto } from './dto/teacher.update.dto';
import { UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/role.auth.guard';
import { Roles } from '../auth/role.decorator';
import { UserRole } from 'src/models/user.entity';
import { Course } from 'src/models/course.entity';

@ApiTags('Teacher')
@Controller('teacher')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({ summary: 'Get teacher by id' })
  @ApiResponse({ status: 200, description: 'Return teacher' })
  @Get(':id')
  @ApiBearerAuth('access-token')
  async getTeacher(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Teacher | null> {
    return await this.teacherService.getTeacher(id);
  }

  @ApiOperation({ summary: 'Get teacher`s courses by teacher id' })
  @ApiResponse({ status: 200, description: 'Return courses' })
  @Get(':id/courses')
  @ApiBearerAuth('access-token')
  @Roles(UserRole.TEACHER)
  async getTeacherCourses(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Course[] | null> {
    return await this.teacherService.getTeacherCourses(id);
  }

  @ApiOperation({ summary: 'Get teacher`s schedule by teacher id' })
  @ApiResponse({ status: 200, description: 'Return schedule' })
  @Get(':id/schedule')
  @ApiBearerAuth('access-token')
  @Roles(UserRole.TEACHER)
  async getTeacherSchedule(@Param('id', ParseUUIDPipe) id: string) {
    return await this.teacherService.getTeacherSchedule(id);
  }

  @ApiOperation({ summary: 'Get teacher`s finals schedule by teacher id' })
  @ApiResponse({ status: 200, description: 'Return finals schedule' })
  @Get(':id/finals')
  @ApiBearerAuth('access-token')
  @Roles(UserRole.TEACHER)
  async getTeacherFinals(@Param('id', ParseUUIDPipe) id: string) {
    return await this.teacherService.getTeacherFinals(id);
  }

  @ApiOperation({ summary: 'Update teacher' })
  @ApiResponse({ status: 200, description: 'Update teacher' })
  @ApiBearerAuth('access-token')
  @Patch(':id')
  @Roles(UserRole.TEACHER)
  async updateTeacher(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateTeacherDto,
  ): Promise<UpdateResult> {
    return await this.teacherService.updateTeacher(id, data);
  }

  @ApiOperation({ summary: 'Delete teacher' })
  @ApiResponse({ status: 204, description: 'Delete teacher' })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async deleteTeacher(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.teacherService.deleteTeacher(id);
  }
}
