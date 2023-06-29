import {model, Schema, Types} from "mongoose";
import {User} from "./User.model";


const ratingSchema = new Schema({
    title: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    content: {
        type: String
    },
    user:{
        type:Types.ObjectId,
        ref:User
    }
},{
    versionKey:false,
    timestamps:true,
})

export const Rating = model('rating',ratingSchema)