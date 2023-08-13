import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from 'src/models/assignment.entity';
import { CreateAssignmentDto } from './dto/assignment.create.dto';
import { UpdateAssignmentDto } from './dto/assignment.update.dto';
import { UploadService } from '../upload/upload.service';
import { CreateCommentDto } from '../comment/dto/comment.create.dto';
import { CreateSolutionDto } from '../solution/dto/solution.create.dto';
import { connectionSource } from 'ormconfig';
import { Comment } from 'src/models/comment.entity';
import { Solution } from 'src/models/solution.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Solution)
    private solutionRepository: Repository<Solution>,
    private uploadService: UploadService,
  ) {}

  public async getAssignment(id: string): Promise<Assignment | null> {
    return await this.assignmentRepository.findOneByOrFail({ id });
  }

  public async getAssignmentComments(id: string): Promise<Comment[] | null> {
    const result = (await connectionSource).manager.query(
      `SELECT * FROM public.comment WHERE "assignmentId" = '${id}'`,
    );
    return result;
  }

  public async getAssignmentSolutions(id: string): Promise<Solution[] | null> {
    const result = (await connectionSource).manager.query(
      `SELECT * FROM public.solution WHERE "assignmentId" = '${id}'`,
    );
    return result;
  }

  public async createAssignmentSolution(
    id: string,
    createSolutionDto: CreateSolutionDto,
    buffer?: Buffer,
    filename?: string,
  ): Promise<Solution> {
    const assignment = (await this.getAssignment(id)) as Assignment;
    if (buffer && filename) {
      const upload = await this.uploadService.upload(buffer, filename);
      const solutionWithUpload = {
        upload,
        assignment,
        ...createSolutionDto,
      };
      this.solutionRepository.create(solutionWithUpload);
      return await this.solutionRepository.save(solutionWithUpload);
    }
    this.solutionRepository.create({ assignment, ...createSolutionDto });
    return await this.solutionRepository.save({
      assignment,
      ...createSolutionDto,
    });
  }

  public async createAssignmentComment(
    id: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const assignment = (await this.getAssignment(id)) as Assignment;
    this.commentRepository.create({ assignment, ...createCommentDto });
    return await this.commentRepository.save({
      assignment,
      ...createCommentDto,
    });
  }

  public async createAssignment(
    createAssignmentDto: CreateAssignmentDto,
    buffer?: Buffer,
    filename?: string,
  ): Promise<Assignment> {
    if (buffer && filename) {
      const upload = await this.uploadService.upload(buffer, filename);
      const assignmentWithUpload = {
        upload,
        ...createAssignmentDto,
      };
      this.assignmentRepository.create(assignmentWithUpload);
      return await this.assignmentRepository.save(assignmentWithUpload);
    }
    this.assignmentRepository.create(createAssignmentDto);
    return await this.assignmentRepository.save(createAssignmentDto);
  }

  public async updateAssignment(
    id: string,
    updateAssignmentDto: UpdateAssignmentDto,
    buffer?: Buffer,
    filename?: string,
  ) {
    if (buffer && filename) {
      const upload = await this.uploadService.upload(buffer, filename);
      return await this.assignmentRepository.update(id, {
        upload,
        ...updateAssignmentDto,
      });
    }
    return await this.assignmentRepository.update(id, updateAssignmentDto);
  }

  public async deleteAssignment(id: string): Promise<void> {
    const upload = await this.assignmentRepository.findOneByOrFail({ id });
    await this.assignmentRepository.delete(id);
    if (upload) {
      await this.uploadService.delete(upload.id);
    }
  }
}
