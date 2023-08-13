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
import { LectureService } from './lecture.service';
import { Lecture } from 'src/models/lecture.entity';
import { UpdateLectureDto } from './dto/lecture.update.dto';
import { UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/role.decorator';
import { UserRole } from 'src/models/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/role.auth.guard';
import { CreateCommentDto } from '../comment/dto/comment.create.dto';

@ApiBearerAuth()
@ApiTags('Lecture')
@Controller('lecture')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @ApiOperation({ summary: 'Get lecture by id' })
  @ApiResponse({ status: 200, description: 'Return lecture' })
  @Get(':id')
  async getLecture(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Lecture | null> {
    return await this.lectureService.getLecture(id);
  }

  @ApiOperation({ summary: 'Get lecture comments by lecture id' })
  @ApiResponse({ status: 200, description: 'Return comments' })
  @Get(':id/comments')
  async getLectureComments(@Param('id', ParseUUIDPipe) id: string) {
    return await this.lectureService.getLectureComments(id);
  }

  @ApiOperation({ summary: 'Create comment to lecture' })
  @ApiResponse({ status: 201, description: 'Return comment' })
  @Post(':id/comment')
  async createLectureComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateCommentDto,
  ) {
    return await this.lectureService.createLectureComment(id, data);
  }

  @ApiOperation({ summary: 'Update lecture' })
  @ApiResponse({ status: 200, description: 'Update lecture' })
  @Patch(':id')
  @Roles(UserRole.TEACHER)
  @UseInterceptors(FileInterceptor('upload'))
  async updateLecture(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateLectureDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<UpdateResult> {
    if (file) {
      const buffer = file.buffer;
      const filename = file.originalname;
      return await this.lectureService.updateLecture(
        id,
        data,
        buffer,
        filename,
      );
    }
    return await this.lectureService.updateLecture(id, data);
  }

  @ApiOperation({ summary: 'Delete lecture' })
  @ApiResponse({ status: 204, description: 'Delete lecture' })
  @Delete(':id')
  @Roles(UserRole.TEACHER)
  async deleteLecture(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.lectureService.deleteLecture(id);
  }
}
