import * as nodemailer from 'nodemailer'

let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "063b13f3cb074d",
    pass: "e4439caae13ca0",
  },
});

export default transport