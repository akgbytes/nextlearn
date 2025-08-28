import { configDotenv } from "dotenv";
import { z } from "zod";

import { logger } from "@/configs/logger";
import { NodeEnv } from "@/utils/constants";

configDotenv();

const envSchema = z.object({
  PORT: validNumber("PORT"),
  DATABASE_URL: validURL("DATABASE_URL"),

  BACKEND_URL: validURL("BACKEND_URL"),
  FRONTEND_URL: validURL("FRONTEND_URL"),

  BETTER_AUTH_SECRET: nonEmptyString("BETTER_AUTH_SECRET"),
  BETTER_AUTH_URL: validURL("BETTER_AUTH_URL"),

  NODE_ENV: z.enum(NodeEnv, {
    error: () => "NODE_ENV must be 'development' or 'production'",
  }),

  GOOGLE_CLIENT_ID: nonEmptyString("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: nonEmptyString("GOOGLE_CLIENT_SECRET"),

  AWS_ACCESS_KEY_ID: nonEmptyString("AWS_ACCESS_KEY_ID"),
  AWS_SECRET_ACCESS_KEY: nonEmptyString("AWS_SECRET_ACCESS_KEY"),
  AWS_REGION: nonEmptyString("AWS_REGION"),
  AWS_S3_BUCKET_NAME_IMAGES: nonEmptyString("AWS_S3_BUCKET_NAME_IMAGES"),
  AWS_ENDPOINT_URL_S3: validURL("AWS_ENDPOINT_URL_S3"),
  AWS_ENDPOINT_URL_IAM: validURL("AWS_ENDPOINT_URL_IAM"),
  RESEND_API_KEY: nonEmptyString("RESEND_API_KEY"),
});

const createEnv = (env: NodeJS.ProcessEnv) => {
  const result = envSchema.safeParse(env);

  if (!result.success) {
    const messages = result.error.issues
      .map((err) => `- ${err.message}`)
      .join("\n");

    logger.error(`Environment variable validation failed\n${messages}`);
    process.exit(1);
  }

  return result.data;
};

export const env = createEnv(process.env);

function validNumber(name: string) {
  return z.preprocess(
    (val) => Number(val),
    z.number({
      error: (issue) =>
        issue.input === undefined
          ? `${name} is required`
          : `${name} must be a number`,
    })
  );
}

function validURL(name: string) {
  return z.url({
    error: (issue) =>
      issue.input === undefined
        ? `${name} is required`
        : `${name} must be a valid URL string`,
  });
}

function nonEmptyString(name: string) {
  return z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? `${name} is required`
          : `${name} must be a string`,
    })
    .nonempty(`${name} cannot be empty`);
}
