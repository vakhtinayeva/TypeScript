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
import { SolutionService } from './solution.service';
import { Solution } from 'src/models/solution.entity';
import { UpdateResult } from 'typeorm';
import { UserRole } from 'src/models/user.entity';
import { Roles } from '../auth/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/role.auth.guard';
import { CreateCommentDto } from '../comment/dto/comment.create.dto';
import { UpdateSolutionDto } from './dto/solution.update.dto';

@ApiBearerAuth()
@ApiTags('Solution')
@Controller('Solution')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) {}

  //check for who it is
  @ApiOperation({ summary: 'Get solution by id' })
  @ApiResponse({ status: 200, description: 'Return solution' })
  @Get(':id')
  async getSolution(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Solution | null> {
    return await this.solutionService.getSolution(id);
  }

  @ApiOperation({ summary: 'Get solution comments by solution id' })
  @ApiResponse({ status: 200, description: 'Return comments' })
  @Get(':id/comments')
  async getSolutionComments(@Param('id', ParseUUIDPipe) id: string) {
    return await this.solutionService.getSolutionComments(id);
  }

  @ApiOperation({ summary: 'Create comment to solution' })
  @ApiResponse({ status: 201, description: 'Create comment' })
  @Post(':id/comment')
  async createSolutionComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateCommentDto,
  ) {
    return await this.solutionService.createSolutionComment(id, data);
  }

  @ApiOperation({ summary: 'Update solution' })
  @ApiResponse({ status: 200, description: 'Update solution' })
  @Patch(':id')
  @Roles(UserRole.TEACHER)
  async updateSolution(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateSolutionDto,
  ): Promise<UpdateResult> {
    return await this.solutionService.updateSolution(id, data);
  }

  //check for who it is
  @ApiOperation({ summary: 'Delete solution' })
  @ApiResponse({ status: 200, description: 'Delete solution' })
  @Delete(':id')
  @Roles(UserRole.STUDENT)
  async deleteSolution(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.solutionService.deleteSolution(id);
  }
}
