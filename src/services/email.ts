import Config from '../config';
import nodemailer from 'nodemailer';

class Email {
  private transporter: any;

  constructor() {
  
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: `${Config.GMAIL_EMAIL}`,
        pass: `${Config.GMAIL_PASSWORD}`,
      },
    });
  }

  async sendEmail(dest: string, subject: string, content: string) {
    const mailOptions = {
      from: `${Config.GMAIL_EMAIL}`,
      to: dest,
      subject: subject,
      html: content
    };

    const response = await this.transporter.sendMail(mailOptions);
    return response;
  }
}

export const EmailService = new Email();