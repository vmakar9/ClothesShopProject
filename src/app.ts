import express from 'express';
import {configs} from "./configs/config";
import * as mongoose from "mongoose";
import {authRouter} from "./routers/auth.router";
import fileUploader from "express-fileupload"
import {userRouter} from "./routers/user.router";


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUploader())

app.use("/auth", authRouter);
app.use("/users",userRouter);

app.listen(configs.PORT,()=> {
    mongoose.connect(configs.DB_URL);
    console.log(`Server is Started on port ${configs.PORT}`);
})
