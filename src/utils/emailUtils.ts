import nodemailer from 'nodemailer';
import { ENV } from '../config/environment.ts';
import { UserResponseDto } from '../dto/userDto.ts';
import { createPasswordChangeConfirmation } from '../emails/passwordChange.ts';
import { createPasswordChangeCode } from '../emails/verificationCode.ts';
import { createVerificationEmail } from '../emails/emailVerification.ts';

const transporter = nodemailer.createTransport({
  host: ENV.EMAIL_HOST,
  port: ENV.EMAIL_PORT,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});

export const sendPasswordChangeCodeEmail = async (
  userName: string,
  userEmail: string,
  code: string,
): Promise<void> => {
  const mailOptions = {
    from: `"CareerStory" <${ENV.EMAIL_USER}>`,
    to: userEmail,
    subject: 'Password Change Confirmation Code – CareerStory',
    html: createPasswordChangeCode(userName, code),
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordChangeConfirmationEmail = async (
  userName: string,
  email: string,
  timestamp: string,
): Promise<void> => {
  const mailOptions = {
    from: `"CareerStory" <${ENV.EMAIL_USER}>`,
    to: email,
    subject: 'Password Changed Successfully – CareerStory',
    html: createPasswordChangeConfirmation(userName, timestamp),
  };

  await transporter.sendMail(mailOptions);
};

export const sendVerificationEmail = async (newUser: UserResponseDto, token: string) => {
  const verificationLink = `${ENV.BACKEND_URL}/auth/confirm-email/${token}`;

  const mailOptions = {
    from: `"CareerStory" <${ENV.EMAIL_USER}>`,
    to: newUser.email,
    subject: `Confirm Your Email – CareerStory`,
    html: createVerificationEmail(newUser, verificationLink),
  };

  await transporter.sendMail(mailOptions);
};
