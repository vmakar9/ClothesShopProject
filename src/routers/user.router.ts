import {Router} from "express"
import {authMiddleware} from "../middleware/auth.middleware";
import {fileMiddleware} from "../middleware/file.middleware";
import {userController} from "../controllers/user.controller";
import {userMiddleware} from "../middleware/user.middleware";
import {accessMiddleware} from "../middleware/access.middleware";

const router = Router();

router.put("/:userId/avatar",
    authMiddleware.checkAccessToken,
    userMiddleware.getByIdOrThrow,
    fileMiddleware.isAvatarValid,
    userController.uploadAvatar);

router.delete("/:userId/avatar",
    authMiddleware.checkAccessToken,
    userMiddleware.getByIdOrThrow,
    userController.deleteAvatar);

router.patch("/:userId",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserAccess,
    userController.update)

export const userRouter = router;
