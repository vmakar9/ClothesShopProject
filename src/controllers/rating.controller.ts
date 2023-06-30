import {NextFunction, Request, Response} from "express";
import {IRating} from "../types/rating.types";
import {ITokenPayload} from "../types/token.types";
import {ratingService} from "../services/rating.service";
import {Rating} from "../models/Rating.model";

class RatingController {
    public async create(req:Request,res:Response,next:NextFunction):Promise<Response<IRating>>{
        try{
            const {_id} = req.res.locals.jwtPayload as ITokenPayload;
            const {userId} = req.params;
            const rating  = await ratingService.create(req.body,_id,userId)
            return res.status(200).json(rating);
        }catch (e) {
            next(e)
        }
    }

    public async getRatingUserById(req:Request,res:Response,next:NextFunction):Promise<Response<IRating>>{
        try {
            const {userId} = req.params;

            const rating = await Rating.find({user:userId})

            return res.status(200).json(rating);
        }catch (e) {
            next(e)
        }
    }

    public async getOwnRating(req:Request,res:Response,next:NextFunction):Promise<Response<IRating>>{
        try {
            const {_id} = req.res.locals.jwtPayload as ITokenPayload;

            const ownrating = await Rating.findById({_id});

            return res.status(200).json(ownrating);
        }catch (e) {
            next(e);
        }
    }

    public async update(req:Request,res:Response,next:NextFunction):Promise<Response<IRating>>{
        try{
            const {ratingId} = req.params;

            const {updateData} = req.body;
            const updatedRating = await ratingService.update(ratingId,updateData);
            return res.status(201).json(updatedRating);
        }catch (e) {
            next(e);
        }
    }

    public async delete(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {ratingId} = req.params

            await ratingService.delete(ratingId);

            res.status(204)
        }catch (e) {
            next(e)
        }
    }
}

export const ratingController = new RatingController();