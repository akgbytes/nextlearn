import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth.js";
import { env } from "@/configs/env";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-uploadthing-package",
      "x-uploadthing-version",
      "traceparent",
      "b3",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.urlencoded({ extended: true }));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

import healthRoute from "@/routes/health.route";
import uploadThingRoute from "@/routes/uploadthing.route";
import courseRoute from "@/routes/course.route";

import { errorHandler } from "@/middlewares/error.middleware";
import { createRouteHandler } from "uploadthing/express";
import { fileRouter } from "@/lib/uploadthing";

app.use("/api/v1/health", healthRoute);
app.use(
  "/api/v1/uploadthing",
  createRouteHandler({
    router: fileRouter,
  })
);

app.use("/api/v1/uploadthing", uploadThingRoute);
app.use("/api/v1/courses", courseRoute);

app.use(errorHandler);

export default app;
