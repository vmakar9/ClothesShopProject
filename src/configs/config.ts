import {config} from "dotenv"
config()
export const configs={
     PORT: process.env.PORT || 5001,
     DB_URL: process.env.DB_URL,

     JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET,
     JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET,

     JWT_FORGOT_SECRET:process.env.JWT_FORGOT_SECRET,
     JWT_ACTIVATE_SECRET:process.env.JWT_ACTIVATE_SECRET
}