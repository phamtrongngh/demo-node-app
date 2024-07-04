import { Router } from "express";
import { signup, login, SignupDto } from "../controllers/auth.controller";
import validateMiddleware from "../middlewares/validate.middleware";

const router = Router();

router.post("/login", login);
router.post("/signup", validateMiddleware(SignupDto), signup);

export default router;
