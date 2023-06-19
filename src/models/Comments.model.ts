import {model, Schema, Types} from "mongoose";
import {User} from "./User.model";


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

    },{
        versionKey:false,
        timestamps:true
    })

export const Comments = model("comments",commentsSchema)