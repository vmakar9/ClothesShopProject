import {Router} from "express";
import {authController} from "../controllers/auth.controller";
import {userMiddleware} from "../middleware/user.middleware";

const router = Router();

router.post('/login',userMiddleware.getDynamicallyOrThrow("email"),authController.login)
router.post('/register',authController.register)

export const authRouter = router