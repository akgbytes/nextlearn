import { DeleteFromS3, UploadOnS3 } from "@/controllers/S3.controller";
import { Router } from "express";

const router = Router();

router.post("/upload", UploadOnS3);
router.post("/delete", DeleteFromS3);

export default router;
