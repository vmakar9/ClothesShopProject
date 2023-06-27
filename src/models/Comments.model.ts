import {model, Schema, Types} from "mongoose";
import {User} from "./User.model";
import {Clothes} from "./Clothes.model";



const commentsSchema = new Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        user: {
            type: Types.ObjectId,
            required: true,
            ref: User,
        },
        clothes:{
            type:Types.ObjectId,
            required:true,
            ref:Clothes
        }


    },{
        versionKey:false,
        timestamps:true
    })

export const Comments = model("comments",commentsSchema)