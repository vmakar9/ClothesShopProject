import {model, Schema, Types} from "mongoose";
import {User} from "./User.model";
import {Clothes} from "./Clothes.model";

const favoritesSchema = new Schema({
    user: {
        type: Types.ObjectId,
        required: true,
        ref: User
    },
    clothes: {
        type: Types.ObjectId,
        required: true,
        ref: Clothes
    }
},
    {
        versionKey:false,
        timestamps:true
})

export const Favorites = model('favorites',favoritesSchema)