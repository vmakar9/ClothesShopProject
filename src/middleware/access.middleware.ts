import {Request,Response,NextFunction} from "express";
import {ITokenPayload} from "../types/token.types";
import {Clothes} from "../models/Clothes.model";
import {ApiError} from "../error/api.error";
import {User} from "../models/User.model";

class AccessMiddleware{
    public async getClothesAccess(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {clothesId} = req.params;
            const {_id} = req.res.locals.jwtPayload as ITokenPayload;
            const clothes = await Clothes.findById(clothesId);

            if(clothes.user._id !=  _id){
                throw new ApiError("Access denied",401);
            }
            res.locals.clothes = clothes;
            next();
        }catch (e) {
            next(e);
        }
    }
    public async getUserAccess(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {userId} = req.params;
            const {_id} = req.res.locals.jwtPayload as ITokenPayload

            const user = await User.findById(userId);
            if(userId !=  _id){
                throw new ApiError("Access denied",401)
            }
            res.locals.user = user;
            next()
        }catch (e) {
            next(e)
        }
    }
}
export const accessMiddleware = new AccessMiddleware();