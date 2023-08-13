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
import { AssignmentService } from './assignment.service';
import { Assignment } from 'src/models/assignment.entity';
import { UpdateAssignmentDto } from './dto/assignment.update.dto';
import { UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserRole } from 'src/models/user.entity';
import { Roles } from '../auth/role.decorator';
import { Comment } from 'src/models/comment.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/role.auth.guard';
import { Solution } from 'src/models/solution.entity';
import { CreateSolutionDto } from '../solution/dto/solution.create.dto';
import { CreateCommentDto } from '../comment/dto/comment.create.dto';

@ApiBearerAuth()
@ApiTags('Assignment')
@Controller('assignment')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @ApiOperation({ summary: 'Get assignment by id' })
  @ApiResponse({ status: 200, description: 'Return assignment' })
  @Get(':id')
  async getAssignment(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Assignment | null> {
    return await this.assignmentService.getAssignment(id);
  }

  @ApiOperation({ summary: 'Get comments to assignment by assignment id' })
  @ApiResponse({ status: 200, description: 'Return comments' })
  @Get(':id/comments')
  async getAssignmentComments(@Param('id', ParseUUIDPipe) id: string) {
    return await this.assignmentService.getAssignmentComments(id);
  }

  @ApiOperation({ summary: 'Get solutions to assignment by assignment id' })
  @ApiResponse({ status: 200, description: 'Return solutions' })
  @Get(':id/solutions')
  @Roles(UserRole.TEACHER)
  async getAssignmentSolutions(@Param('id', ParseUUIDPipe) id: string) {
    return await this.assignmentService.getAssignmentSolutions(id);
  }

  @ApiOperation({ summary: 'Create solution to assignment' })
  @ApiResponse({ status: 201, description: 'Create solution' })
  @Post(':id/solution')
  @Roles(UserRole.STUDENT)
  @UseInterceptors(FileInterceptor('upload'))
  async createAssignmentSolution(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateSolutionDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      const buffer = file.buffer;
      const filename = file.originalname;
      return await this.assignmentService.createAssignmentSolution(
        id,
        data,
        buffer,
        filename,
      );
    }
    return await this.assignmentService.createAssignmentSolution(id, data);
  }

  @ApiOperation({ summary: 'Create comment to assignment' })
  @ApiResponse({ status: 201, description: 'Create comment' })
  @Post(':id/comment')
  async createAssignmentComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateCommentDto,
  ) {
    return await this.assignmentService.createAssignmentComment(id, data);
  }

  @ApiOperation({ summary: 'Update assignment' })
  @ApiResponse({ status: 200, description: 'Update assignment' })
  @Patch(':id')
  @Roles(UserRole.TEACHER)
  @UseInterceptors(FileInterceptor('upload'))
  async updateAssignment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateAssignmentDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<UpdateResult> {
    if (file) {
      const buffer = file.buffer;
      const filename = file.originalname;
      return await this.assignmentService.updateAssignment(
        id,
        data,
        buffer,
        filename,
      );
    }
    return await this.assignmentService.updateAssignment(id, data);
  }

  @ApiOperation({ summary: 'Delete assignment' })
  @ApiResponse({ status: 204, description: 'Delete assignment' })
  @Delete(':id')
  @Roles(UserRole.TEACHER)
  async deleteAssignment(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return await this.assignmentService.deleteAssignment(id);
  }
}
