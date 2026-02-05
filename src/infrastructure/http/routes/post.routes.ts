import { Router } from "express";
import { postController } from "../mapper/post.mapper";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/posts",
  authMiddleware,
  (req, res, next) => postController.create(req, res, next)
);

router.delete(
  "/posts/:id",
  authMiddleware,
  (req, res, next) => postController.delete(req, res, next)
);

router.get(
  "/posts/:post_id",
  (req, res, next) => postController.getPost(req, res, next)
);

router.get(
  "/posts",
  (req, res, next) => postController.listPost(req, res, next)
);

export default router;
