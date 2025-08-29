import { deleteFileFromUploadThing } from "@/controllers/uploadthing.controller";
import { Router } from "express";

const router = Router();

router.delete("/file/:key", deleteFileFromUploadThing);

export default router;
