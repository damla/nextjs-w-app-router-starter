export const isProduction = process.env.PROJECT_ENV === 'production';

export const isDevelopment = process.env.PROJECT_ENV === 'development';

export const url = new URL(
  process.env.PROJECT_HTTP_URL ?? 'http://localhost:3000'
);
