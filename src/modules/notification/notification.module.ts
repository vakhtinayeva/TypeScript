import { Module } from '@nestjs/common';
import MailNotification from './notification.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MailNotification],
  exports: [MailNotification],
})
export class NotificationModule {}
