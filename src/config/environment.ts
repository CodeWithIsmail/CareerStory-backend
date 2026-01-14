// export const ENV = {
//   PORT: parseInt(process.env.PORT || '3000'),
//   DB_HOST: process.env.DB_HOST,
//   DB_PORT: parseInt(process.env.DB_PORT),
//   DB_USERNAME: process.env.DB_USERNAME,
//   DB_PASSWORD: process.env.DB_PASSWORD,
//   DB_DATABASE: process.env.DB_DATABASE,
//   NODE_ENV: process.env.NODE_ENV,
//   LOG_LEVEL: process.env.LOG_LEVEL,

//   JWT_SECRET: process.env.JWT_SECRET,
//   AUTH_JWT_EXPIRES_IN: parseInt(process.env.AUTH_JWT_EXPIRES_IN),
//   EMAIL_VERIFICATION_TOKEN_EXPIRES_IN: parseInt(process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN),
//   SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),

//   EMAIL_HOST: process.env.EMAIL_HOST,
//   EMAIL_PORT: parseInt(process.env.EMAIL_PORT),
//   EMAIL_USER: process.env.EMAIL_USER,
//   EMAIL_PASS: process.env.EMAIL_PASS,
//   BACKEND_URL: process.env.BACKEND_URL,
//   FRONTEND_URL: process.env.FRONTEND_URL,

//   OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
//   AI_MODEL_NAME: process.env.AI_MODEL_NAME,
// };


// Log all environment variables (for debugging - remove later)
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***set***' : 'NOT SET');
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '***set***' : 'NOT SET');

export const ENV = {
  PORT: parseInt(process.env.PORT || '3000'),
  DB_HOST: process.env.DB_HOST || '',
  DB_PORT: parseInt(process.env.DB_PORT || '5432'),
  DB_USERNAME: process.env.DB_USERNAME || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_DATABASE: process.env.DB_DATABASE || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',

  JWT_SECRET: process.env.JWT_SECRET || '',
  AUTH_JWT_EXPIRES_IN: parseInt(process.env.AUTH_JWT_EXPIRES_IN || '2592000'),
  EMAIL_VERIFICATION_TOKEN_EXPIRES_IN: parseInt(process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN || '86400'),
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || '10'),

  EMAIL_HOST: process.env.EMAIL_HOST || '',
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || '587'),
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
  BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3000/api/v1',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
  AI_MODEL_NAME: process.env.AI_MODEL_NAME || 'openai/gpt-4o-mini',
};

console.log('ENV object created successfully');