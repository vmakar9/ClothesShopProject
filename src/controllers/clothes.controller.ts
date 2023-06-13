import {NextFunction, Request, Response} from "express";
import {IClothes} from "../types/clothes.types";
import {clothesService} from "../services/clothes.service";
import {ICommonResponse} from "../types/common.types";
import {ITokenPayload} from "../types/token.types";
import {Clothes} from "../models/Clothes.model";
import {ApiError} from "../error/api.error";


class ClothesController{
    public async getById(req:Request,res:Response,next:NextFunction):Promise<Response<IClothes>>{
        try{
            const { clothes, jwtPayload } =res.locals;
            const result = await clothesService.getById(jwtPayload._id, clothes._id);
            return res.json(result);
        }catch (e) {
            next(e);
        }
    }

    public async create(req:Request,res:Response,next:NextFunction):Promise<Response<ICommonResponse<IClothes>>>{
        try {
            const { _id } = req.res.locals.jwtPayload as ITokenPayload;
            const clothes = await clothesService.create(req.body,_id);
            return res.status(201).json(clothes);
        }catch (e) {
            next(e);
        }
    }

    public async update(req:Request,res:Response,next:NextFunction):Promise<Response<IClothes>>{
        try {
            const { clothesId } = req.params;
            const {_id} = req.res.locals.jwtPayload as ITokenPayload;


            const clothes = await Clothes.findById(clothesId);

            if(clothes.user !=  _id){
                throw new ApiError("You dont have permission to this action ",401)
            }

            const updatedClothes = await Clothes.findByIdAndUpdate(clothesId, { ...req.body }, { new: true });

            return res.status(201).json(updatedClothes);
        }catch (e) {
            next(e);
        }

    }

    public async delete(req:Request,res:Response,next:NextFunction):Promise<Response<void>>{
        try {
            const { clothesId } = req.params;
            const {_id} = req.res.locals.jwtPayload as ITokenPayload;
            const clothes = await Clothes.findById(clothesId);
            if(clothes.user !=  _id){
                throw new ApiError("You dont have permission to this action ",401)
            }

            await Clothes.deleteOne({_id:clothesId});
            return res.sendStatus(204)
        }catch (e) {
            next(e);
        }
    }

}
export const clothesController  = new ClothesController();