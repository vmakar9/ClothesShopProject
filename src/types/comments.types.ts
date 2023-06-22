import {IUser} from "./user.types";
import {Types} from "mongoose";
import {IClothes} from "./clothes.types";


export interface IComments{
    _id?:Types.ObjectId;
    title:string;
    description:string;
    user:IUser | Types.ObjectId;
    clothes:IClothes | Types.ObjectId;
}