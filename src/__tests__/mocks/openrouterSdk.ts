// Mock for @openrouter/sdk
export class OpenRouter {
  constructor(_config: { apiKey: string }) {}

  chat = {
    send: jest.fn().mockResolvedValue({
      choices: [
        {
          message: {
            content: 'Mock AI generated summary',
          },
        },
      ],
    }),
  };
}

export default { OpenRouter };
