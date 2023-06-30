import {Router} from "express"
import {authMiddleware} from "../middleware/auth.middleware";
import {fileMiddleware} from "../middleware/file.middleware";
import {userController} from "../controllers/user.controller";
import {userMiddleware} from "../middleware/user.middleware";
import {accessMiddleware} from "../middleware/access.middleware";
import {ratingController} from "../controllers/rating.controller";
import {ratingMiddleware} from "../middleware/rating.middleware";

const router = Router();

router.put("/:userId/avatar",
    authMiddleware.checkAccessToken,
    userMiddleware.getByIdOrThrow,
    accessMiddleware.getUserStatus,
    fileMiddleware.isAvatarValid,
    userController.uploadAvatar);

router.delete("/:userId/avatar",
    authMiddleware.checkAccessToken,
    userMiddleware.getByIdOrThrow,
    accessMiddleware.getUserStatus,
    userController.deleteAvatar);

router.patch("/:userId",
    authMiddleware.checkAccessToken,
    userMiddleware.getByIdOrThrow,
    accessMiddleware.getUserStatus,
    accessMiddleware.getUserAccess,
    userController.update)

router.post("/:userId/rating",
    authMiddleware.checkAccessToken,
    userMiddleware.getByIdOrThrow,
    accessMiddleware.getUserStatus,
    ratingController.create)

router.get("/:userId/rating",
    authMiddleware.checkAccessToken,
    userMiddleware.getByIdOrThrow,
    accessMiddleware.getUserStatus,
    ratingController.getRatingUserById)

router.get("/rating",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserStatus,
    ratingController.getOwnRating)

router.put("/rating/:ratingId",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserStatus,
    ratingMiddleware.getByIdOrThrow,
    ratingController.update)

router.delete("/rating/:ratingId",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserStatus,
    ratingMiddleware.getByIdOrThrow,
    ratingController.delete)

export const userRouter = router;
