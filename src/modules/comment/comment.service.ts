import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/models/Comment.entity';
import { UpdateCommentDto } from './dto/comment.update.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  public async getCommentById(id: string): Promise<Comment | null> {
    return this.commentRepository.findOneByOrFail({ id });
  }

  public async updateComment(id: string, updateCommentDto: UpdateCommentDto) {
    return await this.commentRepository.update(id, updateCommentDto);
  }

  public async deleteComment(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
