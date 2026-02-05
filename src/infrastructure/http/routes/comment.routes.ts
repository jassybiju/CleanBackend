import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { commentController } from "../mapper/comment.mapper";

const router = Router();

router.post("/posts/:post_id/comments", authMiddleware, (req, res, next) =>
  commentController.create(req, res, next),
);

router.delete(
  "/posts/:post_id/comments/:comment_id",
  authMiddleware,
  (req, res, next) => commentController.delete(req, res, next),
);

export default router;
