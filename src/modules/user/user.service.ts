import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/models/user.entity';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Teacher } from 'src/models/teacher.entity';
import { Student } from 'src/models/student.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private eventEmitter: EventEmitter2,
  ) {}

  public async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOneByOrFail({ id });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneByOrFail({ email });
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.userRepository.create(createUserDto);
    const createdUser = await this.userRepository.save(createUserDto);
    const { email, role } = createdUser;
    console.log(role);

    if (role === UserRole.TEACHER) {
      this.teacherRepository.create({ email });
      await this.teacherRepository.save({ email });
    } else if (role === UserRole.STUDENT) {
      this.studentRepository.create({ email });
      await this.studentRepository.save({ email });
    }

    this.eventEmitter.emit('invite', email);
    return createdUser;
  }

  public async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
