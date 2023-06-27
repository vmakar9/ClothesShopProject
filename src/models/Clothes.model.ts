import  {model, Schema, Types} from "mongoose";

import {EClothesPeople} from "../enum/clothes-people.enum";
import {IClothes} from "../types/clothes.types";
import {User} from "./User.model";



const clothesSchema = new Schema(
    {
        title:{
            type:String,
        },
        description:{
            type:String,
        },
        price:{
            type:Number,
        },
        color:{
            type:String,
        },
        size:{
            type:Array,
        },
        materials:{
            type:String,
        },
        country:{
            type:String,
        },
        availability:{
            type:Boolean,
        },
        season:{
            type:Array,
        },
        people:{
            type:String,
            enum:EClothesPeople,
        },
        type:{
            type:String,
        },
        photos:{
            type:Array
        },
        user:{
            type:Types.ObjectId,
            required: true,
            ref:User,
        },
    },{
        versionKey:false,
        timestamps:true
    }
);


export const Clothes = model<IClothes>('clothes',clothesSchema)
