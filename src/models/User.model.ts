import {model,Schema} from "mongoose";
import {EGenders} from "../enum/gender.enum";
import {EUserStatus} from "../enum/user-status.enum";

const userSchema = new Schema(
    {
        name:{
            type:String
        },
        age:{
            type:Number
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
        gender:{
            type:String,
            enum:EGenders
        },
        status:{
            type:String,
            enum:EUserStatus,
            default:EUserStatus.inactive
        }
    },
    {
        versionKey:false,
        timestamp:true
    }
)
export const User = model('user',userSchema);