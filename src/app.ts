import express from 'express';
import {configs} from "./configs/config";
import * as mongoose from "mongoose";
import {authRouter} from "./routers/auth.router";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/auth", authRouter);

app.listen(configs.PORT,()=> {
    mongoose.connect(configs.DB_URL);
    console.log(`Server is Started on port ${configs.PORT}`);
})
