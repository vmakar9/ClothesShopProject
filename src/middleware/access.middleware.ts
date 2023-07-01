import {Request,Response,NextFunction} from "express";
import {ITokenPayload} from "../types/token.types";
import {Clothes} from "../models/Clothes.model";
import {ApiError} from "../error/api.error";
import {User} from "../models/User.model";
import {Comments} from "../models/Comments.model";
import {Rating} from "../models/Rating.model";

class AccessMiddleware{
    public async getClothesAccess(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {clothesId} = req.params;
            const {_id,role} = req.res.locals.jwtPayload as ITokenPayload;
            const clothes = await Clothes.findById(clothesId);

            if(clothes.user._id !=  _id && role !=  'admin'){
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
    public async getUserStatus(req:Request,res:Response,next:NextFunction):Promise<void>{
         try {
             const {_id} = req.res.locals.jwtPayload as ITokenPayload;

             const user = await User.findById(_id);

             if(user.status !=  'active'){
               throw new ApiError("Your account is not activated or blocked",401)
             }
             res.locals.user = user;
             next()
         }catch (e) {
             next(e)
         }
    }
    public async ifUserAdmin(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const {_id,role} = req.res.locals.jwtPayload as ITokenPayload;
            const user = await User.findById(_id);

            if (!user) {
                throw new ApiError("User not found", 404);
            }

            if(role !=  'admin'){
                throw new ApiError("You dont have any permission to do it",401)
            }
            res.locals.user = user;
            next();
        }catch (e) {
            next(e);
        }
    }

    public async getCommentsAccess(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {commentsId} = req.params;
            const {_id,role} = req.res.locals.jwtPayload as ITokenPayload;

            const comment = await Comments.findById(commentsId);

            if(comment.user !=  _id && role !=  'admin' ){
                throw new ApiError("Access denied",401)
            }
            res.locals.comment = comment;
            next()
        }catch (e) {
            next(e)
        }
    }

    public async getRatingAccess(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {ratingId} = req.params;
            const {_id,role} = req.res.locals.jwtPayload as ITokenPayload;

            const rating = await  Rating.findById(ratingId);

            if(rating.user !=  _id && role !=  'admin'){
                throw new ApiError("Access denied",401)
            }
            res.locals.rating = rating;
            next()
        }catch (e) {
            next(e)
        }
    }
}
export const accessMiddleware = new AccessMiddleware();