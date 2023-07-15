import {model, Types,Schema} from "mongoose";
import {User} from "./User.model";

const messageSchema =  new Schema({
    sender: {
        type: Types.ObjectId,
        required: true,
        ref: User,
    },
    recipient: {
        type: Types.ObjectId,
        required: true,
        ref: User,
    },
    content: {
        type: String,
        required: true
    },
},
    {
        versionKey:false,
        timestamps:true
})

export const Messages = model("messages",messageSchema)