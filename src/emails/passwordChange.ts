export function createPasswordChangeConfirmation(userName: string, timestamp: string): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #2a6df4; margin-bottom: 16px;">CareerStory</h2>

      <p>Hi ${userName},</p>

      <p>Your password has been changed successfully on <strong>${timestamp}</strong>.</p>
      
      <div style="background-color: #e8f5e9; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #4caf50;">
        <p style="margin: 0; color: #2e7d32;">✓ Password change completed</p>
      </div>
      
      <p>If you didn't make this change, please contact support immediately and reset your password.</p>
      
      <p><strong>Security Tips:</strong></p>
      <ul style="color: #666;">
        <li>Use a strong, unique password</li>
        <li>Don't share your password with anyone</li>
        <li>Update your password regularly</li>
        <li>Be cautious of phishing emails</li>
      </ul>
      
      <p style="margin-top: 24px; font-size: 12px; color: #888;">
        © ${new Date().getFullYear()} CareerStory
      </p>
    </div>
  `;
}
