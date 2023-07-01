import {NextFunction, Request, Response} from "express";
import {Rating} from "../models/Rating.model";
import {ApiError} from "../error/api.error";

class RatingMiddleware{
    public async getIdOrThrow(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {ratingId} = req.params;

            const rating = await Rating.findById(ratingId);

            if(!rating){
                throw new ApiError("Rating not found",422);
            }

            res.locals.rating = rating;
            next()
        }catch (e) {
            next(e)
        }
    }

    public async getTargetIdOrThrow(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {targetId} = req.params;

            const rating = await Rating.find({target:targetId});

            if(!rating){
                throw new ApiError("Rating not found",422);
            }

            res.locals.rating = rating;
            next()
        }catch (e) {
            next(e)
        }
    }
}

export const ratingMiddleware = new RatingMiddleware();