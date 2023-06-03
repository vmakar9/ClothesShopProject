import {Router} from "express";
import {authController} from "../controllers/auth.controller";
import {userMiddleware} from "../middleware/user.middleware";
import {authMiddleware} from "../middleware/auth.middleware";

const router = Router();

router.post('/login',userMiddleware.getDynamicallyOrThrow("email"),authController.login)
router.post('/register',userMiddleware.getDynamicallyAndThrow("email"),authController.register)
router.post('/refresh',authMiddleware.checkRefreshToken,authController.refresh)


export const authRouter = router