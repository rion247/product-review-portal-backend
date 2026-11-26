import nodemailer from 'nodemailer';
import config from '../app/config';

const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    tls: {
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2',
    },
    auth: {
      user: config.smtp_user,
      pass: config.smtp_pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Product Review Portal Team" <vivianrionmarandi@gmail.com>',
    to,
    subject: 'Password Reset Link',
    html,
  });

  console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
