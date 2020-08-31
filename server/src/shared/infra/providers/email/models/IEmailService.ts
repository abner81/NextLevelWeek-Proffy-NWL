export default interface IEmailService {
  sendEmail(
    toEmail: string,
    fromEmail: string,
    subject: string,
    contentText: string
  ): Promise<any>
}