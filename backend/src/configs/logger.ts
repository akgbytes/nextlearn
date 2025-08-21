import { addColors, createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const colors = {
  info: "blue",
  warn: "yellow",
  error: "red",
  http: "cyan",
  debug: "gray",
};

addColors(colors);

const uppercaseFormat = format((info) => {
  info.level = info.level.toUpperCase();
  return info;
});

const customFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level} [LMS]: ${message}`;
});

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: () => new Date().toISOString() }),
    uppercaseFormat(),
    format.splat(),
    format.metadata({ fillExcept: ["timestamp", "level", "message", "stack"] })
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), customFormat),
    }),
    new DailyRotateFile({
      filename: "logs/%DATE%-combined.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      level: "info",
      format: format.combine(customFormat),
    }),
    new DailyRotateFile({
      filename: "logs/%DATE%-error.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "30d",
      level: "error",
      format: format.combine(customFormat),
    }),
  ],

  exceptionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],

  rejectionHandlers: [new transports.File({ filename: "logs/rejections.log" })],

  exitOnError: false,
});
