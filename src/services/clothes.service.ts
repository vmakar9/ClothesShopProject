import {IClothes} from "../types/clothes.types";
import {Clothes} from "../models/Clothes.model";
import {Types} from "mongoose";
import {ApiError} from "../error/api.error";
import {UploadedFile} from "express-fileupload";
import {s3Service} from "./s3.service";
import {IPaginationResponse, IQuery} from "../types/pagination.types";

class ClothesService{
    public async create(data:IClothes,userId:string){
        try {
             await Clothes.create({...data,user: new Types.ObjectId(userId)});
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }



    public async getWithPagination(query:IQuery):Promise<IPaginationResponse<IClothes>>{
        try {
            const queryStr = JSON.stringify(query);
            const queryObj = JSON.parse(queryStr.replace(/\b(gte|lte|gt|lt)\b/,(match)=>  `$${match}`))

            const {
                page = 1,
                limit = 5,
                sortedBy = "createdAt",
                ...searchObject
            } = queryObj;

            const skip = limit * (page - 1);

            const clothes = await Clothes.find(searchObject)
                .limit(limit)
                .skip(skip)
                .sort(sortedBy)
                .lean();

            const clothesTotalCount = await Clothes.count();

            return {
                page: +page,
                itemsCount: clothesTotalCount,
                perPage: +limit,
                itemsFound: clothes.length,
                data:clothes
            };
        }catch (e) {
            throw new ApiError(e.message,e.status);
        }
    }

    public async getClothesById(clothesId:string):Promise<IClothes>{
        try {
            return  await Clothes.findById(clothesId).populate({path:'user',select:['name','surname']})
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }

    public async uploadPhotos(file:UploadedFile,clothes:IClothes):Promise<IClothes>{
        try {
            const filePath = await s3Service.uploadPhotos(file,"cloth", clothes._id);

            const currentPhotos = clothes.photos || []; // Отримуємо поточні фотографії або створюємо пустий масив, якщо вони відсутні
            const newPhotos = [...currentPhotos, filePath];

            return await Clothes.findByIdAndUpdate(
                clothes._id,
                {photos:newPhotos},
                {new:false}
            );

        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }

    public async deletePhoto(clothes:IClothes,photoIndex:number):Promise<IClothes>{
        try{
            const currentPhotos = clothes.photos || [];
            if(photoIndex <0 || photoIndex >=  currentPhotos.length){
                throw new ApiError("Invalid photo index",422)
            }

            const photoPathToDelete = currentPhotos[photoIndex];

            await s3Service.deletePhoto(photoPathToDelete);
            currentPhotos.splice(photoIndex,1)

            return await Clothes.findByIdAndUpdate(
                clothes._id,
                {photos:currentPhotos},
                {new:true}
            )
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }

}

export const clothesService= new ClothesService();