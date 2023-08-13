import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import MailNotification, { EmailComponents } from './notification.service';

@Injectable()
export class InvitationListener {
  constructor(private notificationService: MailNotification) {}

  @OnEvent('invite')
  //change text and data
  handleAddEvent(email: string) {
    const subject = 'Account created';
    const content = `Account created`;
    const emailComponents: EmailComponents = {
      email,
      subject,
      content,
    };
    this.notificationService.sendMail(emailComponents);
  }
}
