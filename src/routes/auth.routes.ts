import express from "express";
import {
  createSessionHandler,
  deleteSessionHandler,
  refreshAccessTokenHandler,
} from "../controller/auth.controller";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/auth.schema";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.post(
  "/api/sessions",
  validateResource(createSessionSchema),
  createSessionHandler
);

router.delete("/api/sessions", requireUser, deleteSessionHandler);

router.post("/api/sessions/refresh", refreshAccessTokenHandler);

export default router;
