export const isProduction =
  process.env.NEXT_PUBLIC_PROJECT_ENV === 'production';

export const isDevelopment =
  process.env.NEXT_PUBLIC_PROJECT_ENV === 'development';

export const url = new URL(
  process.env.NEXT_PUBLIC_PROJECT_HTTP_URL ?? 'http://localhost:3000'
);
