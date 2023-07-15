import express from 'express';
import {configs} from "./configs/config";
import * as mongoose from "mongoose";
import {authRouter} from "./routers/auth.router";
import fileUploader from "express-fileupload"
import {userRouter} from "./routers/user.router";
import {clothesRouter} from "./routers/clothes.router";
import {Server,Socket} from "socket.io";
import http from "http";
import {messagesRouter} from "./routers/messages.router";
import {adminRouter} from "./routers/admin.router";
import {favoriteRouter} from "./routers/favorites.router";
import cors from "cors"


const app = express();
const server = http.createServer(app);
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUploader())
app.set('io', io);

app.use("/auth", authRouter);
app.use("/users",userRouter);
app.use("/clothes",clothesRouter)
app.use("/messages",messagesRouter)
app.use("/admin",adminRouter)
app.use("/favorite",favoriteRouter)
app.use(cors())

io.on('connection',(socket:Socket)=>  {
    console.log("New  socket connected",socket.id);

    socket.on('message',(data) =>  {
        console.log('Received message:',data);
        const io = app.get('io');
        io.emit('message',data);
    })

    socket.on('disconnect',()=>  {
        console.log('Socket disconnect:',socket.id)
    })
})

app.listen(configs.PORT,()=> {
    mongoose.connect(configs.DB_URL);
    console.log(`Server is Started on port ${configs.PORT}`);
})
