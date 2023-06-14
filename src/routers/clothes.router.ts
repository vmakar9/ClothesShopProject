import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {clothesController} from "../controllers/clothes.controller";
import {clothesMiddleware} from "../middleware/clothes.middleware";

const router = Router();

router.get("/",clothesController.getAll)

router.post("/",authMiddleware.checkAccessToken,clothesController.create)

router.get("/:clothesId",clothesMiddleware.getIdOrThrow,clothesController.getClothesById)

router.put("/:clothesId",authMiddleware.checkAccessToken,clothesMiddleware.getIdOrThrow,clothesController.update)

router.delete("/:clothesId",authMiddleware.checkAccessToken,clothesMiddleware.getIdOrThrow,clothesController.delete)

export const clothesRouter = router;