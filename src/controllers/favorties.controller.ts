import {NextFunction, Request, Response} from "express";
import {IFavorites} from "../types/favorites.types";
import {ITokenPayload} from "../types/token.types";
import {Favorites} from "../models/Favorites.model";
import {ApiError} from "../error/api.error";

class FavortiesController{
    public async addToFavorites(req:Request,res:Response,next:NextFunction):Promise<Response<IFavorites>>{
        try {
            const {_id} = req.res.locals.jwtPayload as ITokenPayload;
            const {clothesId} = req.params;

            const existingItem = await Favorites.findOne({user:_id,clothes:clothesId})

            if(existingItem){
                throw new ApiError("Item already existing in your list",422)
            }

            const favorite = await Favorites.create({user:_id,clothes:clothesId});

            return res.status(200).json(favorite)
        }catch (e) {
            next(e)
        }
    }

    public async deleteFromFavorites(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {_id} = req.res.locals.jwtPayload as ITokenPayload;
            const {clothesId} = req.params;

            const existingItem = await Favorites.findOne({user:_id,clothes:clothesId});

            if(!existingItem){
                throw new ApiError("Item not found in your list",404)
            }

            const favorite = await Favorites.findByIdAndDelete(existingItem._id)
            res.status(204).json(favorite);
        }catch (e) {
            next(e)
        }
    }

    public async getFavorites(req:Request,res:Response,next:NextFunction):Promise<Response<IFavorites[]>>{
        try {
            const {_id} = req.res.locals.jwtPayload as ITokenPayload;
            const favortesItems = await Favorites.find({user:_id}).populate('clothes')

            return res.status(200).json(favortesItems)
        }catch (e) {
            next(e)
        }
    }
}

export const favoritesController = new FavortiesController();