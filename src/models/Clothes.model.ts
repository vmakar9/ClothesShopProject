import  {model, Schema, Types} from "mongoose";

import { User } from "./User.model"
import {EClothesPeople} from "../enum/clothes-people.enum";

const clothesSchema = new Schema(
    {
        title:{
            type:String,
        },
        description:{
            title:String,
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
