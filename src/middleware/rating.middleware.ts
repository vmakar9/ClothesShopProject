import {NextFunction, Request, Response} from "express";
import {Rating} from "../models/Rating.model";
import {ApiError} from "../error/api.error";

class RatingMiddleware{
    public async getByIdOrThrow(req:Request,res:Response,next:NextFunction){
        try {
            const {ratingId} = req.params;

            const rating = await Rating.findById(ratingId);

            if(!rating){
                throw new ApiError("Rating not found",404);
            }

            res.locals.rating = rating;
            next()
        }catch (e) {
            next(e)
        }
    }
}

export const ratingMiddleware = new RatingMiddleware();