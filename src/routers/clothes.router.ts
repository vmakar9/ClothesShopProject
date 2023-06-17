import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {clothesController} from "../controllers/clothes.controller";
import {clothesMiddleware} from "../middleware/clothes.middleware";
import {accessMiddleware} from "../middleware/access.middleware";

const router = Router();

router.get("/",
    clothesController.getAll)

router.post("/",
    authMiddleware.checkAccessToken,
    clothesController.create)

router.get("/:clothesId",
    clothesMiddleware.getIdOrThrow,
    clothesController.getClothesById)

router.put("/:clothesId",
    authMiddleware.checkAccessToken,
    clothesMiddleware.getIdOrThrow,
    accessMiddleware.getClothesAccess,
    clothesController.update)

router.delete("/:clothesId",
    authMiddleware.checkAccessToken,
    clothesMiddleware.getIdOrThrow,
    accessMiddleware.getClothesAccess,
    clothesController.delete)

router.put("/photos/:clothesId",
    authMiddleware.checkAccessToken,
    clothesMiddleware.getIdOrThrow,
    accessMiddleware.getClothesAccess,
    clothesController.uploadPhotos)

router.delete("/photos/:clothesId/:index",
    authMiddleware.checkAccessToken,
    clothesMiddleware.getIdOrThrow,
    accessMiddleware.getClothesAccess,
    clothesController.deletePhoto)

export const clothesRouter = router;