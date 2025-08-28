import { env } from "@/configs/env";
import { asyncHandler } from "@/utils/asyncHandler";
import { handleZodError } from "@/utils/handleZodError";

import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";
import {
  validateDeleteFile,
  validateUploadFile,
} from "@/validations/S3.validation";

export const UploadOnS3 = asyncHandler(async (req, res) => {
  const { fileName, size, contentType, isImage } = handleZodError(
    validateUploadFile(req.body)
  );

  const uniqueKey = `${uuidv4()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME_IMAGES,
    ContentType: contentType,
    ContentLength: size,
    Key: uniqueKey,
  });

  const presignedUrl = await getSignedUrl(S3, command, {
    expiresIn: 6 * 60, // URL expires in 6 min
  });

  res.status(201).json(
    new ApiResponse(200, "Presigned url created successfully", {
      presignedUrl,
      key: uniqueKey,
    })
  );
});

export const DeleteFromS3 = asyncHandler(async (req, res) => {
  const { key } = handleZodError(validateDeleteFile(req.body));

  const command = new DeleteObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME_IMAGES,
    Key: key,
  });

  await S3.send(command);

  res.status(201).json(new ApiResponse(200, "File deleted successfully", {}));
});
