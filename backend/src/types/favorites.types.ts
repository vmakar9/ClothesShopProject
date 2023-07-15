import {Types} from "mongoose";
import {IUser} from "./user.types";
import {IClothes} from "./clothes.types";

export interface IFavorites{
    _id?:Types.ObjectId;
    user:IUser | Types.ObjectId;
    clothes:IClothes | Types.ObjectId;
}