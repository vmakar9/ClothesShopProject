import {model, Schema} from "mongoose";
import {EUserStatus} from "../enum/user-status.enum";
import {ERoles} from "../enum/roles.enum";


const userSchema = new Schema(
    {
        name:{
            type:String
        },
        surname:{
            type:String,
        },
        email:{
            type:String,
            unique:true,
            required:[true,"Email is required"],
            trim:true,
            lowercase:true
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        avatar:{
            type:String,
            required:false
        },
        status:{
            type:String,
            enum:EUserStatus,
            default:EUserStatus.inactive
        },
        role:{
            type:String,
            enum:ERoles,
            default:ERoles.user
        },

    },
    {
        versionKey:false,
        timestamp:true
    }
)
export const User = model('user',userSchema);