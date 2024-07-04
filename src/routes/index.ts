import { Router } from "express";
import postRouter from "./posts.router";
import authRouter from "./auth.router";

const router = Router();



router.use("/v1/posts", postRouter);
router.use("/v1/auth", authRouter);

export default router;
