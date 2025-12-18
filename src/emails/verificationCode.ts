export function createPasswordChangeCode(userName: string, code: string): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #2a6df4; margin-bottom: 16px;">CareerStory</h2>

      <p>Hi ${userName},</p>

      <p>You requested to change your password. Use the confirmation code below:</p>
      
      <div style="background-color: #f0f0f0; padding: 15px; text-align: center; margin: 20px 0; border-radius: 5px;">
        <h3 style="letter-spacing: 5px; font-size: 28px; margin: 0; color: #333;">
          ${code}
        </h3>
      </div>
      
      <p><strong>This code expires in 15 minutes.</strong></p>
      <p>If you didn't request this, please ignore this email and contact support immediately.</p>
      <p>For security, never share this code with anyone.</p>
      
      <p style="margin-top: 24px; font-size: 12px; color: #888;">
        © ${new Date().getFullYear()} CareerStory
      </p>
    </div>
  `;
}
