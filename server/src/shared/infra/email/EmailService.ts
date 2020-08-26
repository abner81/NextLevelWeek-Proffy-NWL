import mailer from '@shared/infra/email/index'

export default class EmailService {
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