import { DeleteFromS3, UploadOnS3 } from "@/controllers/s3.controller";
import { Router } from "express";

const router = Router();

router.post("/api/v1/s3/upload", UploadOnS3);
router.post("/api/v1/s3/delete", DeleteFromS3);

export default router;
