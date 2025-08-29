import { createCourse } from "@/controllers/course.controller";
import { isLoggedIn } from "@/middlewares/auth.middleware";
import { isAdmin } from "@/middlewares/role.middleware";
import { Router } from "express";

const router = Router();

router.use(isLoggedIn);

router.post("/", isAdmin, createCourse);

export default router;
