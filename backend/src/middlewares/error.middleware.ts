import { logger } from "@/configs/logger";
import { ApiError } from "@/utils/ApiError";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let apiError: ApiError;

  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2000":
        apiError = new ApiError(
          400,
          `Input value is too long for the field "${error.meta?.column_name}".`
        );
        break;
      case "P2001":
        apiError = new ApiError(
          404,
          "No record found for the specified condition."
        );
        break;
      case "P2002":
        apiError = new ApiError(
          409,
          `Unique constraint failed on field(s): ${(
            error.meta?.target as string[]
          )?.join(", ")}`
        );
        break;
      case "P2003":
        apiError = new ApiError(
          400,
          `Invalid reference on "${error.meta?.field_name || "foreign key"}".`
        );
        break;
      case "P2004":
        apiError = new ApiError(400, "A database constraint was violated.");
        break;
      case "P2005":
        apiError = new ApiError(
          400,
          `Invalid value stored for field "${error.meta?.field_name}".`
        );
        break;
      case "P2006":
        apiError = new ApiError(
          400,
          `Invalid value provided for field "${error.meta?.field_name}".`
        );
        break;
      case "P2007":
        apiError = new ApiError(400, "Data validation error.");
        break;
      case "P2008":
        apiError = new ApiError(
          400,
          "Query parsing error. Please check query syntax."
        );
        break;
      case "P2009":
        apiError = new ApiError(400, "Query validation error.");
        break;
      case "P2010":
        apiError = new ApiError(
          400,
          `Raw query failed. Error: ${error.message}`
        );
        break;
      case "P2011":
        apiError = new ApiError(
          400,
          `Null constraint violation on field "${error.meta?.constraint}".`
        );
        break;
      case "P2012":
        apiError = new ApiError(
          400,
          `Missing required value for field "${error.meta?.path}".`
        );
        break;
      case "P2013":
        apiError = new ApiError(
          400,
          `Missing required argument: "${error.meta?.argument_name}".`
        );
        break;
      case "P2014":
        apiError = new ApiError(
          400,
          `Action violates required relation: (${error.meta?.relation_name}).`
        );
        break;
      case "P2015":
        apiError = new ApiError(
          400,
          `Related record not found for relation "${error.meta?.relation_name}".`
        );
        break;
      case "P2016":
        apiError = new ApiError(
          400,
          "Invalid query logic. Please check your conditions."
        );
        break;
      case "P2017":
        apiError = new ApiError(
          400,
          `Records not connected for relation "${error.meta?.relation_name}".`
        );
        break;
      case "P2018":
        apiError = new ApiError(
          404,
          "Invalid record reference — related record not found."
        );
        break;
      case "P2019":
        apiError = new ApiError(
          400,
          `Input error: ${error.meta?.details || "Invalid data"}.`
        );
        break;
      case "P2020":
        apiError = new ApiError(
          400,
          `Value out of range for field "${error.meta?.field_name}".`
        );
        break;
      case "P2021":
        apiError = new ApiError(
          500,
          `Table "${error.meta?.table}" does not exist.`
        );
        break;
      case "P2022":
        apiError = new ApiError(
          500,
          `Column "${error.meta?.column}" does not exist.`
        );
        break;
      case "P2023":
        apiError = new ApiError(
          500,
          `Inconsistent column data: ${
            error.meta?.details || "corruption detected"
          }.`
        );
        break;
      case "P2024":
        apiError = new ApiError(500, "Database timeout — query took too long.");
        break;
      case "P2025":
        apiError = new ApiError(
          404,
          `${error.meta?.modelName || "Resource"} not found or already deleted.`
        );
        break;
      case "P2026":
        apiError = new ApiError(
          500,
          "Unsupported feature in current database provider."
        );
        break;
      case "P2027":
        apiError = new ApiError(
          500,
          "Multiple database errors occurred in a single query."
        );
        break;
      case "P2028":
        apiError = new ApiError(500, "Transaction API error.");
        break;
      case "P2030":
        apiError = new ApiError(
          500,
          `Database cannot be accessed: ${
            error.meta?.database_file || "Unknown reason"
          }.`
        );
        break;
      case "P2031":
        apiError = new ApiError(500, "Database file is locked.");
        break;
      case "P2033":
        apiError = new ApiError(
          500,
          "Number of columns does not match expected."
        );
        break;
      case "P2034":
        apiError = new ApiError(
          500,
          "Transaction failed due to conflict or deadlock."
        );
        break;
      case "P2035":
        apiError = new ApiError(500, "Too many database connections open.");
        break;
      case "P2036":
        apiError = new ApiError(
          500,
          "Database schema is out of sync. Please run migrations."
        );
        break;
      default:
        apiError = new ApiError(
          400,
          `Unexpected database error (code: ${error.code}).`
        );
        break;
    }
    logError(apiError, req, { code: error.code, meta: error.meta });
  } else if (error instanceof PrismaClientValidationError) {
    apiError = new ApiError(
      400,
      "Invalid input — please check data format or required fields."
    );
    logError(apiError, req);
  } else if (error instanceof PrismaClientUnknownRequestError) {
    apiError = new ApiError(500, "An unknown database error occurred.");
    logError(apiError, req);
  } else if (error instanceof PrismaClientRustPanicError) {
    apiError = new ApiError(
      500,
      "Database engine crashed unexpectedly. Try again later."
    );
    logError(apiError, req);
  } else if (error instanceof PrismaClientInitializationError) {
    apiError = new ApiError(
      500,
      "Failed to initialize database connection. Check credentials."
    );
    logError(apiError, req);
  } else if (error instanceof ApiError) {
    apiError = error;
    logError(apiError, req);
  } else {
    apiError = new ApiError(500, error.message || "Internal Server Error");
    logError(apiError, req);
  }

  res.status(apiError.statusCode).json({
    code: apiError.statusCode,
    message: apiError.message,
    data: apiError.data,
    success: apiError.success,
  });
};

function logError(error: any, req: Request, extra?: Record<string, any>) {
  const lines = [
    `${error.message}`,
    `Path   : ${req.path}`,
    `Method : ${req.method}`,
    `IP     : ${req.ip}`,
  ];

  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      lines.push(
        `${key.padEnd(7)}: ${
          typeof value === "object" ? JSON.stringify(value, null, 2) : value
        }`
      );
    }
  }

  logger.error(lines.join("\n"));
}
