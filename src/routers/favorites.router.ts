import {Router} from "express"
import {authMiddleware} from "../middleware/auth.middleware";
import {accessMiddleware} from "../middleware/access.middleware";
import {clothesMiddleware} from "../middleware/clothes.middleware";
import {favoritesController} from "../controllers/favorties.controller";

const router = Router()

router.post("/:clothesId",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserStatus,
    clothesMiddleware.getIdOrThrow,
    favoritesController.addToFavorites)

router.delete("/:clothesId",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserStatus,
    clothesMiddleware.getIdOrThrow,
    favoritesController.deleteFromFavorites)

router.get("/",
    authMiddleware.checkAccessToken,
    accessMiddleware.getUserStatus,
    favoritesController.getFavorites)

export const favoriteRouter = router;