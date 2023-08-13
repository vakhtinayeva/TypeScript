import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/models/user.entity';
import MailNotification from '../notification/notification.service';
import { InvitationListener } from 'src/modules/notification/invitation.listener';
import { Teacher } from 'src/models/teacher.entity';
import { Student } from 'src/models/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Teacher, Student])],
  providers: [UserService, MailNotification, InvitationListener],
  controllers: [UserController],
})
export class UserModule {}
