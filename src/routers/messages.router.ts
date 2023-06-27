import {Router} from "express"
import {authMiddleware} from "../middleware/auth.middleware";
import {messagesController} from "../controllers/messages.controller";

const router = Router()

router.get("/recivedmessages",
    authMiddleware.checkAccessToken,
    messagesController.get)

router.post("/:recipient",
    authMiddleware.checkAccessToken,
    messagesController.sendMessage)

router.get("/sendedmessages",
    authMiddleware.checkAccessToken,
    messagesController.sendersMessages)

export const messagesRouter = router;