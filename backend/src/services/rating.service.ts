import {IRating} from "../types/rating.types";
import {Rating} from "../models/Rating.model";
import {Types} from "mongoose";
import {ApiError} from "../error/api.error";

class RatingService {
    public async create(data:IRating,creatorId: string, targetId: string){
        try {
            await Rating.create({...data,
                user:new Types.ObjectId(creatorId),
                target:targetId})
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }

}

export const ratingService = new RatingService();