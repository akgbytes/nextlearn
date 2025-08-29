import { deleteFileFromUploadThing } from "@/controllers/uploadthing.controller";
import { isLoggedIn } from "@/middlewares/auth.middleware";
import { isAdmin } from "@/middlewares/role.middleware";
import { Router } from "express";

const router = Router();

router.delete("/file/:key", isLoggedIn, isAdmin, deleteFileFromUploadThing);

export default router;
