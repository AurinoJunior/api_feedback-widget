import nodemailer from "nodemailer";
import { IMail, IMailAdapter } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2eab89882a193c",
    pass: "b66b5d164dabfd",
  },
});

export class NodemailerAdapter implements IMailAdapter {
  async sendMail({ subject, body }: IMail) {
    await transport.sendMail({
      from: "Naruto Uzumaki <narutinho123@email.com>",
      to: "Monkey D Luffy <reidospiratas@email.com>",
      subject,
      html: body,
    });
  }
}
