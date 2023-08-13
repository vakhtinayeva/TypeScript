import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/models/student.entity';
import { UpdateStudentDto } from './dto/student.update.dto';
import { connectionSource } from 'ormconfig';
import { Course } from 'src/models/course.entity';
import { CourseService } from '../course/course.service';
import { Assignment } from 'src/models/assignment.entity';
import { AssignmentService } from '../assignment/assignment.service';
import { Solution } from 'src/models/solution.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private courseService: CourseService,
    private assignmentService: AssignmentService,
  ) {}

  public async getStudent(id: string): Promise<Student | null> {
    return await this.studentRepository.findOneByOrFail({ id });
  }

  public async getStudentCourses(id: string): Promise<Course[] | null> {
    const result = (await connectionSource).manager.query(
      `SELECT * FROM public.course_students_student LEFT JOIN public.course ON "courseId" = "id" WHERE "studentId" = '${id}'`,
    );
    return result;
  }

  public async getStudentSchedule(id: string) {
    const result = (await connectionSource).manager.query(
      `SELECT day, "time" FROM public.course_students_student LEFT JOIN public.course ON "courseId" = "id" WHERE "studentId" = '${id}' ORDER BY day, time`,
    );
    return result;
  }

  public async getStudentFinals(id: string) {
    const result = (await connectionSource).manager.query(
      `SELECT "finalDate" FROM public.course_students_student LEFT JOIN public.course ON "courseId" = "id" WHERE "studentId" = '${id}' ORDER BY "finalDate`,
    );
    return result;
  }

  public async getStudentGrades(id: string) {
    const courses = (await this.getStudentCourses(id)) as Course[];
    const courseId = courses[0].id;
    const assignments = (await this.courseService.getCourseAssignments(
      courseId,
    )) as Assignment[];
    const assignmentId = assignments[0].id;
    const solutions = (await this.assignmentService.getAssignmentSolutions(
      assignmentId,
    )) as Solution[];
    const grades = solutions.map((solution) => solution.grade);
    return grades;
  }

  public async getStudentResults(id: string) {
    const courses = (await this.getStudentCourses(id)) as Course[];
    const courseId = courses[0].id;
    const assignments = (await this.courseService.getCourseAssignments(
      courseId,
    )) as Assignment[];
    const assignmentId = assignments.filter(
      (assignment) => assignment.final === true,
    )[0].id;
    const solutions = (await this.assignmentService.getAssignmentSolutions(
      assignmentId,
    )) as Solution[];
    const grades = solutions.map((solution) => solution.grade);
    return grades;
  }

  public async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
    return await this.studentRepository.update(id, updateStudentDto);
  }

  public async deleteStudent(id: string): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
