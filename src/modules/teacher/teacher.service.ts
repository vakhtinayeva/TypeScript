import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from 'src/models/teacher.entity';
import { UpdateTeacherDto } from './dto/teacher.update.dto';
import { Course } from 'src/models/course.entity';
import { connectionSource } from 'ormconfig';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  public async getTeacher(id: string): Promise<Teacher | null> {
    return await this.teacherRepository.findOneByOrFail({ id });
  }

  public async getTeacherCourses(id: string): Promise<Course[] | null> {
    const result = (await connectionSource).manager.query(
      `SELECT * FROM public.course WHERE "teacherId" = '${id}'`,
    );
    return result;
  }

  //ORDER BY day, time
  public async getTeacherSchedule(id: string) {
    const result = (await connectionSource).manager.query(
      `SELECT day, "time" FROM public.course WHERE "teacherId" = '${id}' ORDER BY "day", "time"`,
    );
    return result;
  }

  //ORDER BY day, time
  public async getTeacherFinals(id: string) {
    const result = (await connectionSource).manager.query(
      `SELECT "finalDate" FROM public.course WHERE "teacherId" = '${id}' ORDER BY "finalDate"`,
    );
    return result;
  }

  public async updateTeacher(id: string, updateTeacherDto: UpdateTeacherDto) {
    return await this.teacherRepository.update(id, updateTeacherDto);
  }

  public async deleteTeacher(id: string): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
