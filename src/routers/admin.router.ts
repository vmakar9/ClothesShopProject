import {Router} from "express"
import {authMiddleware} from "../middleware/auth.middleware";
import {accessMiddleware} from "../middleware/access.middleware";
import {adminController} from "../controllers/admin.controller";
import {userMiddleware} from "../middleware/user.middleware";

const router = Router();

router.get("/users",
    authMiddleware.checkAccessToken,
    accessMiddleware.ifUserAdmin,
    adminController.getAll)
router.post("/banlist/:userId",
    authMiddleware.checkAccessToken,
    userMiddleware.getByIdOrThrow,
    accessMiddleware.ifUserAdmin,
    adminController.banUser)

router.get("/banlist/",
    authMiddleware.checkAccessToken,
    accessMiddleware.ifUserAdmin,
    adminController.getBanedUsers)

export const adminRouter = router