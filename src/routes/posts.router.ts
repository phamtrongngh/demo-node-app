import { Router } from "express";
import { createPost, createPostDto, getPosts } from "../controllers/posts.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import validateMiddleware from "../middlewares/validate.middleware";

const router = Router();

router.use(AuthMiddleware);

router.post("/", validateMiddleware(createPostDto), createPost);
router.get("/", getPosts);

export default router;
