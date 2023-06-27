import {Types} from "mongoose";
import {IUser} from "./user.types";

export interface IMessage{
    _id?:Types.ObjectId,
    sender:IUser | Types.ObjectId,
    recipient:IUser | Types.ObjectId,
    content:string
}