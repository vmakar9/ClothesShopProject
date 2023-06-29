import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {clothesController} from "../controllers/clothes.controller";
import {clothesMiddleware} from "../middleware/clothes.middleware";
import {accessMiddleware} from "../middleware/access.middleware";

import {commentsController} from "../controllers/comments.controller";

const router = Router();

router.get("/",
    clothesController.getAll)

router.post("/",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserStatus,
    clothesController.create)

router.get("/:clothesId",
    clothesMiddleware.getIdOrThrow,
    clothesController.getClothesById)

router.put("/:clothesId",
    authMiddleware.checkAccessToken,
    clothesMiddleware.getIdOrThrow,
    accessMiddleware.getUserStatus,
    accessMiddleware.getClothesAccess,
    clothesController.update)

router.delete("/:clothesId",
    authMiddleware.checkAccessToken,
    clothesMiddleware.getIdOrThrow,
    accessMiddleware.getUserStatus,
    accessMiddleware.getClothesAccess,
    clothesController.delete)

router.put("/photos/:clothesId",
    authMiddleware.checkAccessToken,
    clothesMiddleware.getIdOrThrow,
    accessMiddleware.getUserStatus,
    accessMiddleware.getClothesAccess,
    clothesController.uploadPhotos)

router.delete("/photos/:clothesId/:index",
    authMiddleware.checkAccessToken,
    clothesMiddleware.getIdOrThrow,
    accessMiddleware.getUserStatus,
    accessMiddleware.getClothesAccess,
    clothesController.deletePhoto)

router.post("/:clothesId/comments",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserStatus,
    clothesMiddleware.getIdOrThrow,
    commentsController.create)

router.put("/comments/:commentsId",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserStatus,
    commentsController.update)

router.delete("/comments/:commentsId",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserStatus,
    commentsController.delete)

router.get("/:clothesId/comments",
    authMiddleware.checkAccessToken,
    clothesMiddleware.getIdOrThrow,
    accessMiddleware.getUserStatus,
    commentsController.getById)



export const clothesRouter = router;

