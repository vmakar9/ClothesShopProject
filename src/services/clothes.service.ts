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
    public async getById(userId: string, carId: string): Promise<IClothes> {
        try {
            const result = await Clothes.aggregate([
                {
                    $match: {
                        _id: carId,
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

    public async update(userId:string,data:IClothes,clothesId:string) {
        try {
            const clothes = await Clothes.findByIdAndUpdate({_id: clothesId, user: userId}, data, {new: true});
            if (!clothes) {
                throw new ApiError("Clothes not found or user does not have permission", 401);
            }
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }

    public async delete(clothesId:string,userId:string):Promise<void>{
        try {
            const result = await Clothes.deleteOne({_id:clothesId,user:userId})
            if(result.deletedCount ===   0){
                throw new ApiError("Clothes not found or user does not have permission",401)
            }
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }

}

export const clothesService= new ClothesService();