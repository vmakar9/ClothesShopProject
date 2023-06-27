import {Router} from "express"
import {authMiddleware} from "../middleware/auth.middleware";
import {messagesController} from "../controllers/messages.controller";
import {accessMiddleware} from "../middleware/access.middleware";

const router = Router()

router.get("/recivedmessages",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserStatus,
    messagesController.get)

router.post("/:recipient",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserAccess,
    messagesController.sendMessage)

router.get("/sendedmessages",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserStatus,
    messagesController.sendersMessages)

export const messagesRouter = router;