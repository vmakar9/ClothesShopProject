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

    public async getAll():Promise<IClothes[]>{
        try{
            return Clothes.find()
        }catch (e){
            throw new ApiError(e.message,e.status)
        }
    }

    public async getClothesById(clothesId:string):Promise<IClothes>{
        try {
            return  await Clothes.findById(clothesId).populate({path:'user',select:['name','surname']})
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }


}

export const clothesService= new ClothesService();