import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/course.create.dto';
import { UpdateCourseDto } from './dto/course.update.dto';
import { UpdateResult } from 'typeorm';
import { Course } from 'src/models/course.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/role.auth.guard';
import { Roles } from '../auth/role.decorator';
import { UserRole } from 'src/models/user.entity';
import { CreateLectureDto } from '../lecture/dto/lecture.create.dto';
import { CreateAssignmentDto } from '../assignment/dto/assignment.create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Lecture } from 'src/models/lecture.entity';
import { Assignment } from 'src/models/assignment.entity';

@ApiBearerAuth()
@ApiTags('Course')
@Controller('course')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: 'Get course by id' })
  @ApiResponse({ status: 200, description: 'Return course' })
  @Get(':id')
  @ApiBearerAuth('access-token')
  async getCourse(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Course | null> {
    return await this.courseService.getCourse(id);
  }

  @ApiOperation({ summary: 'Get course`s students by course id' })
  @ApiResponse({ status: 200, description: 'Return students' })
  @Get(':id/students')
  @ApiBearerAuth('access-token')
  @Roles(UserRole.TEACHER)
  async getCourseStudents(@Param('id', ParseUUIDPipe) id: string) {
    return await this.courseService.getCourseStudents(id);
  }

  @ApiOperation({ summary: 'Get course`s lectures by course id' })
  @ApiResponse({ status: 200, description: 'Return lectures' })
  @Get(':id/lectures')
  @ApiBearerAuth('access-token')
  async getCourseLectures(@Param('id', ParseUUIDPipe) id: string) {
    return await this.courseService.getCourseLectures(id);
  }

  @ApiOperation({ summary: 'Get course`s assignments by course id' })
  @ApiResponse({ status: 200, description: 'Return assignments' })
  @Get(':id/assignments')
  @ApiBearerAuth('access-token')
  async getCourseAssignments(@Param('id', ParseUUIDPipe) id: string) {
    return await this.courseService.getCourseAssignments(id);
  }

  @ApiOperation({ summary: 'Create course' })
  @ApiResponse({ status: 201, description: 'Create course' })
  @Post()
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  async createCourse(@Body() data: CreateCourseDto): Promise<Course> {
    return await this.courseService.createCourse(data);
  }

  @ApiOperation({ summary: 'Create lecture in course' })
  @ApiResponse({ status: 201, description: 'Create lecture' })
  @Post(':id/lecture')
  @ApiBearerAuth('access-token')
  @Roles(UserRole.TEACHER)
  @UseInterceptors(FileInterceptor('upload'))
  async createCourseLecture(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateLectureDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Lecture> {
    if (file) {
      const buffer = file.buffer;
      const filename = file.originalname;
      return await this.courseService.createCourseLecture(
        id,
        data,
        buffer,
        filename,
      );
    }
    return await this.courseService.createCourseLecture(id, data);
  }

  @ApiOperation({ summary: 'Create assignment in course' })
  @ApiResponse({ status: 201, description: 'Create assignment' })
  @Post(':id/assignment')
  @ApiBearerAuth('access-token')
  @Roles(UserRole.TEACHER)
  @UseInterceptors(FileInterceptor('upload'))
  async createCourseAssignment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateAssignmentDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Assignment> {
    if (file) {
      const buffer = file.buffer;
      const filename = file.originalname;
      return await this.courseService.createCourseAssignment(
        id,
        data,
        buffer,
        filename,
      );
    }
    return await this.courseService.createCourseAssignment(id, data);
  }

  @ApiOperation({ summary: 'Update course' })
  @ApiResponse({ status: 200, description: 'Update course' })
  @Patch(':id')
  @ApiBearerAuth('access-token')
  @Roles(UserRole.TEACHER)
  async updateCourse(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateCourseDto,
  ): Promise<UpdateResult> {
    return await this.courseService.updateCourse(id, data);
  }

  @ApiOperation({ summary: 'Delete course' })
  @ApiResponse({ status: 204, description: 'Delete course' })
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  async deleteCourse(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.courseService.deleteCourse(id);
  }
}
