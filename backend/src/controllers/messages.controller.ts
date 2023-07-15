import {NextFunction, Request, Response} from "express";
import {ITokenPayload} from "../types/token.types";
import {Messages} from "../models/Message.model";
import {IMessage} from "../types/message.types";

class MessagesController{
    public async sendMessage(req:Request,res:Response,next:NextFunction):Promise<Response<IMessage>>{
        try {
            const {_id} = req.res.locals.jwtPayload as ITokenPayload;
            const {recipient} = req.params;
            const {content} = req.body;
            const io = req.app.get('io');
            const message = await Messages.create({sender:_id,recipient,content})
            io.emit('message',{sender:_id,recipient,message})
            return  res.status(201).json(message)
        }catch (e) {
            next(e)
        }
    }
    public async get(req:Request,res:Response,next:NextFunction):Promise<Response<IMessage>>{
        try {
            const {_id} = req.res.locals.jwtPayload as ITokenPayload;
            const messages = await Messages.find({recipient:_id});

           return  res.status(200).json(messages);
        }catch (e) {
            next(e);
        }
    }

    public async sendersMessages(req:Request,res:Response,next:NextFunction):Promise<Response<IMessage>>{
        try {
            const {_id:sender} = req.res.locals.jwtPayload as ITokenPayload
            const messages = await Messages.find({sender})
            return res.status(200).json(messages)
        }catch (e) {
            next(e)
        }
    }
}

export const messagesController = new MessagesController;