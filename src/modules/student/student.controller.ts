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
import { StudentService } from './student.service';
import { Student } from 'src/models/Student.entity';
import { UpdateStudentDto } from './dto/student.update.dto';
import { UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/role.auth.guard';
import { Roles } from '../auth/role.decorator';
import { UserRole } from 'src/models/user.entity';
import { Course } from 'src/models/course.entity';

@ApiBearerAuth()
@ApiTags('Student')
@Controller('student')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: 'Get student by id' })
  @ApiResponse({ status: 200, description: 'Return student' })
  @Get(':id')
  async getStudent(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Student | null> {
    return await this.studentService.getStudent(id);
  }

  @ApiOperation({ summary: 'Get student`s courses by student id' })
  @ApiResponse({ status: 200, description: 'Return courses' })
  @Get(':id/courses')
  @Roles(UserRole.STUDENT)
  async getStudentCourses(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Course[] | null> {
    return await this.studentService.getStudentCourses(id);
  }

  @ApiOperation({ summary: 'Get student`s schedule by student id' })
  @ApiResponse({ status: 200, description: 'Return schedule' })
  @Get(':id/schedule')
  @Roles(UserRole.STUDENT)
  async getStudentSchedule(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Student | null> {
    return await this.studentService.getStudentSchedule(id);
  }

  @ApiOperation({ summary: 'Get student`s grades by student id' })
  @ApiResponse({ status: 200, description: 'Return grades' })
  @Get(':id/grades')
  @Roles(UserRole.STUDENT)
  async getStudentGrades(@Param('id', ParseUUIDPipe) id: string) {
    return await this.studentService.getStudentGrades(id);
  }

  @ApiOperation({ summary: 'Get student`s finals schedule by student id' })
  @ApiResponse({ status: 200, description: 'Return finals schedule' })
  @Get(':id/finals')
  @Roles(UserRole.STUDENT)
  async getStudentFinals(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Student | null> {
    return await this.studentService.getStudentFinals(id);
  }

  @ApiOperation({ summary: 'Get student`s finals results by student id' })
  @ApiResponse({ status: 200, description: 'Return finals results' })
  @Get(':id/results')
  @Roles(UserRole.STUDENT)
  async getStudentResults(@Param('id', ParseUUIDPipe) id: string) {
    return await this.studentService.getStudentResults(id);
  }

  @ApiOperation({ summary: 'Update student' })
  @ApiResponse({ status: 200, description: 'Update student' })
  @Patch(':id')
  @Roles(UserRole.STUDENT)
  async updateStudent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateStudentDto,
  ): Promise<UpdateResult> {
    return await this.studentService.updateStudent(id, data);
  }

  @ApiOperation({ summary: 'Delete student' })
  @ApiResponse({ status: 204, description: 'Delete student' })
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async deleteStudent(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.studentService.deleteStudent(id);
  }
}
