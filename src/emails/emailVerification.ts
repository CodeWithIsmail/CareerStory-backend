import { UserProfileDto } from '../dto/userDto.ts';

export function createVerificationEmail(newUser: UserProfileDto, verificationLink: string): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #2a6df4; margin-bottom: 16px;">CareerStory</h2>

      <p>Hi ${newUser.userName},</p>

      <p>Welcome to CareerStory. Please confirm your email address to activate your account.</p>

      <p>
        <a href="${verificationLink}" 
           style="background: #2a6df4; color: white; padding: 10px 18px; 
                  text-decoration: none; border-radius: 4px;">
          Confirm Email
        </a>
      </p>

      <p>If the button does not work, you can use this link:</p>
      <p style="word-break: break-all; color: #2a6df4;">${verificationLink}</p>

      <p>This link expires in 24 hours.</p>

      <p>If you did not request this, you can safely ignore this email.</p>

      <p style="margin-top: 24px; font-size: 12px; color: #888;">
        © ${new Date().getFullYear()} CareerStory
      </p>
    </div>
  `;
}
