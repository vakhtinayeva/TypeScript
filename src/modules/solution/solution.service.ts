import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solution } from 'src/models/Solution.entity';
import { UpdateSolutionDto } from './dto/solution.update.dto';
import { UploadService } from '../upload/upload.service';
import { CreateCommentDto } from '../comment/dto/comment.create.dto';
import { connectionSource } from 'ormconfig';
import { Comment } from 'src/models/comment.entity';

@Injectable()
export class SolutionService {
  constructor(
    @InjectRepository(Solution)
    private solutionRepository: Repository<Solution>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private uploadService: UploadService,
  ) {}

  public async getSolution(id: string): Promise<Solution | null> {
    return await this.solutionRepository.findOneByOrFail({ id });
  }

  public async getSolutionComments(id: string): Promise<Comment[] | null> {
    const result = (await connectionSource).manager.query(
      `SELECT * FROM public.comment WHERE "solutionId" = '${id}'`,
    );
    return result;
  }

  public async createSolutionComment(
    id: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const solution = (await this.getSolution(id)) as Solution;
    this.commentRepository.create({ solution, ...createCommentDto });
    return await this.commentRepository.save({
      solution,
      ...createCommentDto,
    });
  }

  public async updateSolution(
    id: string,
    updateSolutionDto: UpdateSolutionDto,
    buffer?: Buffer,
    filename?: string,
  ) {
    if (buffer && filename) {
      const upload = await this.uploadService.upload(buffer, filename);
      return await this.solutionRepository.update(id, {
        upload,
        ...updateSolutionDto,
      });
    }
    return await this.solutionRepository.update(id, updateSolutionDto);
  }

  public async deleteSolution(id: string): Promise<void> {
    const upload = await this.solutionRepository.findOneByOrFail({ id });
    await this.solutionRepository.delete(id);
    if (upload) {
      await this.uploadService.delete(upload.id);
    }
  }
}
