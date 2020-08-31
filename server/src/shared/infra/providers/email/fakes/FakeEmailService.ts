import IEmailService from "../models/IEmailService";

export default class FakeEmailService implements IEmailService {
  async sendEmail(
    toEmail: string,
    fromEmail: string,
    subject: string,
    contentText: string
  ) {
    const sendEmailSucess = Promise.all('aaa')
    return sendEmailSucess;
  }
}
