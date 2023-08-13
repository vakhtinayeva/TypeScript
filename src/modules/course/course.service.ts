import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from 'src/models/course.entity';
import { CreateCourseDto } from './dto/course.create.dto';
import { UpdateCourseDto } from './dto/course.update.dto';
import { CreateLectureDto } from '../lecture/dto/lecture.create.dto';
import { Lecture } from 'src/models/lecture.entity';
import { Assignment } from 'src/models/assignment.entity';
import { UploadService } from '../upload/upload.service';
import { CreateAssignmentDto } from '../assignment/dto/assignment.create.dto';
import { connectionSource } from 'ormconfig';
import { Student } from 'src/models/student.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    private uploadService: UploadService,
  ) {}

  public async getCourse(id: string): Promise<Course | null> {
    return await this.courseRepository.findOneByOrFail({ id });
  }

  public async getCourseStudents(id: string): Promise<Student[] | null> {
    const result = (await connectionSource).manager.query(
      `SELECT * FROM public.course_students_student LEFT JOIN public.student ON "studentId" = "id" WHERE "courseId" = '${id}'`,
    );
    return result;
  }

  public async getCourseLectures(id: string): Promise<Lecture[] | null> {
    const result = (await connectionSource).manager.query(
      `SELECT * FROM public.lecture WHERE "courseId" = '${id}'`,
    );
    return result;
  }

  public async getCourseAssignments(id: string): Promise<Assignment[] | null> {
    const result = (await connectionSource).manager.query(
      `SELECT * FROM public.assignment WHERE "courseId" = '${id}'`,
    );
    return result;
  }

  public async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    this.courseRepository.create(createCourseDto);
    return await this.courseRepository.save(createCourseDto);
  }

  public async createCourseLecture(
    id: string,
    createLectureDto: CreateLectureDto,
    buffer?: Buffer,
    filename?: string,
  ): Promise<Lecture> {
    const course = (await this.getCourse(id)) as Course;
    if (buffer && filename) {
      const upload = await this.uploadService.upload(buffer, filename);
      const lectureWithUpload = {
        upload,
        course,
        ...createLectureDto,
      };
      this.lectureRepository.create(lectureWithUpload);
      return await this.lectureRepository.save(lectureWithUpload);
    }
    this.lectureRepository.create({ course, ...createLectureDto });
    return await this.lectureRepository.save({ course, ...createLectureDto });
  }

  public async createCourseAssignment(
    id: string,
    createAssignmentDto: CreateAssignmentDto,
    buffer?: Buffer,
    filename?: string,
  ): Promise<Assignment> {
    const course = (await this.getCourse(id)) as Course;
    if (buffer && filename) {
      const upload = await this.uploadService.upload(buffer, filename);
      const assignmentWithUpload = {
        upload,
        course,
        ...createAssignmentDto,
      };
      this.assignmentRepository.create(assignmentWithUpload);
      return await this.assignmentRepository.save(assignmentWithUpload);
    }
    this.assignmentRepository.create({ course, ...createAssignmentDto });
    return await this.assignmentRepository.save({
      course,
      ...createAssignmentDto,
    });
  }

  public async updateCourse(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.courseRepository.update(id, updateCourseDto);
  }

  public async deleteCourse(id: string): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
