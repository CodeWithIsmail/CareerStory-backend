export const ENV = {
  PORT: parseInt(process.env.PORT ),
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT ),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,

  JWT_SECRET: process.env.JWT_SECRET,
  AUTH_JWT_EXPIRES_IN: parseInt(process.env.AUTH_JWT_EXPIRES_IN ),
  EMAIL_VERIFICATION_TOKEN_EXPIRES_IN: parseInt(process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN),
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || '10'),

  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || '587'),
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  BACKEND_URL: process.env.BACKEND_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,

  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  AI_MODEL_NAME: process.env.AI_MODEL_NAME,
};
