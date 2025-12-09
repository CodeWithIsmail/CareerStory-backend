import { OpenRouter } from '@openrouter/sdk';
import { ENV } from '../config/environment.ts';
import { CreateStoryDto } from '../dto/storyDto.ts';
import logger from '../utils/logger.ts';

export class AIService {
  private openRouter = new OpenRouter({
    apiKey: ENV.OPENROUTER_API_KEY,
  });
  private modelName: string = ENV.AI_MODEL_NAME;

  async generateStorySummary(title: string, body: string): Promise<string> {
    try {
      const prompt = `You are an expert career coach. Summarize the following interview experience in a concise and structured manner suitable for quick reading. Focus on actionable insights, key takeaways, and guidance a job seeker could immediately use. Include:
- Overall interview process (briefly)
- Main challenges and solutions
- Practical advice for future candidates
- Notable achievements or outcomes

Keep the summary short, ideally 5-7 sentences, while retaining essential information. Make it readable and informative for a job seeker who wants a quick overview.

Story:
Title: ${title}
Body:
${body}

Summary:`;

      const response = await this.openRouter.chat.send({
        model: this.modelName,
        messages: [{ role: 'user', content: prompt }],
        stream: false,
      });
      const summary = (response.choices?.[0]?.message?.content as string) || '';
      return summary;
    } catch (error) {
      logger.error('Error generating story summary:', error);
      //   throw new Error('Failed to generate story summary.');
    }
  }
}
