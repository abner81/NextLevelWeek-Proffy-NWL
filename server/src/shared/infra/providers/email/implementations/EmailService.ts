import mailer from '@shared/infra/providers/email/index'
import IEmailService from '../models/IEmailService';

export default class EmailService implements IEmailService {
  async sendEmail (toEmail: string, fromEmail: string, subject: string, contentText: string) {
     const sendEmailSucess = await mailer.sendMail({
       to: toEmail,
       from: fromEmail,
       subject: subject,
       text: contentText,
     });

     return sendEmailSucess
  }
}