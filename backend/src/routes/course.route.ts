import { isLoggedIn } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.use(isLoggedIn);

export default router;
