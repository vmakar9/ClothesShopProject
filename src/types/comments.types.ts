import {IUser} from "./user.types";
import {Types} from "mongoose";


export interface IComments{
    _id?:Types.ObjectId;
    title:string;
    description:string;
    user:IUser | Types.ObjectId;
}