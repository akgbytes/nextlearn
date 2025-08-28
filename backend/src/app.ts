import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth.js";
import { env } from "@/configs/env";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: true }));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

import healthRoute from "@/routes/health.route";
import S3Routes from "./routes/S3.route";
import { errorHandler } from "@/middlewares/error.middleware";
import { createRouteHandler } from "uploadthing/express";
import { fileRouter } from "@/lib/uploadthing";

app.use("/api/v1/health", healthRoute);
app.use("/api/v1/s3", S3Routes);
app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: fileRouter,
  })
);

app.use(errorHandler);

export default app;
