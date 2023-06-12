import {Types} from "mongoose";
import {IUser} from "./user.types";

export interface IClothes{
    _id?: Types.ObjectId;
    title:string;
    description:string;
    price:number;
    color:string;
    size:string[];
    materials:string;
    country:string;
    availability:boolean;
    season:string[];
    people:string;
    type:string;
    user:IUser | Types.ObjectId
}