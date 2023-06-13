import {NextFunction, Request, Response} from "express";
import {Clothes} from "../models/Clothes.model";
import {ApiError} from "../error/api.error";

class ClothesMiddleware{
    public async getIdOrThrow(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const { clothesId } = req.params;

            const clothes = await Clothes.findById(clothesId);

            if(!clothes){
                throw new ApiError("Clothes not found",422)
            }
            res.locals.clothes = clothes
            next();
        }catch (e) {
            next(e)
        }
    }
}
export const clothesMiddleware = new ClothesMiddleware();
