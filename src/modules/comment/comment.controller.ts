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
import { CommentService } from './comment.service';
import { Comment } from 'src/models/comment.entity';
import { UpdateCommentDto } from './dto/comment.update.dto';
import { UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/role.auth.guard';

@ApiBearerAuth()
@ApiTags('Comment')
@Controller('Comment')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  //check for whose it is
  @ApiOperation({ summary: 'Get comment by id' })
  @ApiResponse({ status: 200, description: 'Return comment' })
  @Get(':id')
  async getComment(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Comment | null> {
    return await this.commentService.getCommentById(id);
  }

  @ApiOperation({ summary: 'Update comment by' })
  @ApiResponse({ status: 200, description: 'Return comment' })
  @Patch(':id')
  async updateComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateCommentDto,
  ): Promise<UpdateResult> {
    return await this.commentService.updateComment(id, data);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 200, description: 'Return comment' })
  @Delete(':id')
  async deleteComment(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.commentService.deleteComment(id);
  }
}
