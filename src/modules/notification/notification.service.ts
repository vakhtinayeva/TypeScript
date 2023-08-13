import { Injectable } from '@nestjs/common';
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
  TestAccount,
} from 'nodemailer';

export interface EmailComponents {
  email: string;
  subject: string;
  content: string;
}

@Injectable()
export default class MailNotification {
  testAccount!: TestAccount;

  private async init() {
    this.testAccount = await createTestAccount();

    return createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: this.testAccount.user,
        pass: this.testAccount.pass,
      },
    });
  }

  async sendMail(emailComponents: EmailComponents) {
    const transporter = await this.init();
    try {
      const info = await transporter.sendMail({
        from: '<futurewebsite@example.com>',
        to: emailComponents.email,
        subject: emailComponents.subject,
        text: emailComponents.content,
      });
      console.log('Preview URL: %s', getTestMessageUrl(info));
      return info;
    } catch (err) {
      console.log(err);
    }
  }
}
