import {IClothes} from "../types/clothes.types";
import {Clothes} from "../models/Clothes.model";
import {Types} from "mongoose";
import {ApiError} from "../error/api.error";

class ClothesService{
    public async create(data:IClothes,userId:string){
        try {
             await Clothes.create({...data,user: new Types.ObjectId(userId)});
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }

    public async getById(userId: string, clothesId: string): Promise<IClothes> {
        try {
            const result = await Clothes.aggregate([
                {
                    $match: {
                        _id: clothesId,
                        user: new Types.ObjectId(userId),
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                    },
                },
            ]);
            return result[0];
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }


}

export const clothesService= new ClothesService();