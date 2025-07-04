import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  PORT: z.coerce.number().optional().default(8080),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_BUCKET: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_REGION: z.string(),
  AWS_ENDPOINT: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;
