import {Types} from "mongoose";
import {IUser} from "./user.types";

export interface IRating{
    _id?:Types.ObjectId,
    title:string,
    rating:number,
    content:string,
    user:IUser | Types.ObjectId;
    target:IUser | Types.ObjectId;
}