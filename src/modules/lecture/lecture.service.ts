import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from 'src/models/lecture.entity';
import { UpdateLectureDto } from './dto/lecture.update.dto';
import { UploadService } from '../upload/upload.service';
import { connectionSource } from 'ormconfig';
import { CreateCommentDto } from '../comment/dto/comment.create.dto';
import { Comment } from 'src/models/comment.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private uploadService: UploadService,
  ) {}

  public async getLecture(id: string): Promise<Lecture | null> {
    return await this.lectureRepository.findOneByOrFail({ id });
  }

  public async getLectureComments(id: string): Promise<Comment[] | null> {
    const result = (await connectionSource).manager.query(
      `SELECT * FROM public.comment WHERE "lectureId" = '${id}'`,
    );
    return result;
  }

  public async createLectureComment(
    id: string,
    createCommentDto: CreateCommentDto,
  ) {
    const lecture = (await this.getLecture(id)) as Lecture;
    this.commentRepository.create({ lecture, ...createCommentDto });
    return await this.commentRepository.save({ lecture, ...createCommentDto });
  }

  public async updateLecture(
    id: string,
    updateLectureDto: UpdateLectureDto,
    buffer?: Buffer,
    filename?: string,
  ) {
    if (buffer && filename) {
      const upload = await this.uploadService.upload(buffer, filename);
      return await this.lectureRepository.update(id, {
        upload: upload,
        ...updateLectureDto,
      });
    }
    return await this.lectureRepository.update(id, updateLectureDto);
  }

  public async deleteLecture(id: string): Promise<void> {
    const upload = (await this.lectureRepository.findOneByOrFail({ id }))
      .upload;
    await this.lectureRepository.delete(id);
    if (upload) {
      await this.uploadService.delete(upload.id);
    }
  }
}
