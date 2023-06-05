import {Router} from "express";
import {authController} from "../controllers/auth.controller";
import {userMiddleware} from "../middleware/user.middleware";
import {authMiddleware} from "../middleware/auth.middleware";
import {EActionTokenType} from "../enum/action-token-type";

const router = Router();

router.post('/login',userMiddleware.getDynamicallyOrThrow("email"),authController.login)
router.post('/register',userMiddleware.getDynamicallyAndThrow("email"),authController.register)
router.post('/refresh',authMiddleware.checkRefreshToken,authController.refresh)
router.post('/password/change',authMiddleware.checkAccessToken,userMiddleware.getDynamicallyAndThrow("email"),authController.changePassword)
router.post('/password/forgot',authController.forgotPassword)
router.put('/password/forgot/:token',authMiddleware.checkOldPassword,authController.setForgotPassword)
router.post('/activate',userMiddleware.getDynamicallyOrThrow("email"),authController.sendActivateToken)
router.put('/activate/:token',authMiddleware.checkActionToken(EActionTokenType.activate),authController.activate)



export const authRouter = router