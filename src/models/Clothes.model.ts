import  {model, Schema, Types} from "mongoose";

import { User } from "./User.model"
import {EClothesPeople} from "../enum/clothes-people.enum";

const clothesSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            title:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        color:{
            type:String,
            required:true,
        },
        size:{
            type:Array,
            required:true,
        },
        materials:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        availability:{
            type:Boolean,
            required:true
        },
        season:{
            type:Array,
            required:true
        },
        people:{
            type:String,
            enum:EClothesPeople,
            required:true
        },
        type:{
            type:String,
            required:true,
        },
        user:{
            type:Types.ObjectId,
            required: true,
            ref:User,
        }
    },{
        versionKey:false,
        timestamps:true
    }
);

export const Clothes = model('clothes',clothesSchema)
