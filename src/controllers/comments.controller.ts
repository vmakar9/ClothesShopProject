import {Request, Response, NextFunction} from "express";
import {IComments} from "../types/comments.types";
import {ITokenPayload} from "../types/token.types";
import {commentsService} from "../services/comments.service";
import {Comments} from "../models/Comments.model";



class CommentsController{
    public async create(req:Request,res:Response,next:NextFunction):Promise<Response<IComments>>{
        try {
            const {_id} = req.res.locals.jwtPayload as ITokenPayload;
            const {clothesId} = req.params
            const comment = await commentsService.create(req.body,_id,clothesId);

            return res.status(201).json(comment);
        }catch (e) {
            next(e)
        }
    }

    public async getById(req:Request,res:Response,next:NextFunction):Promise<Response<IComments>>{
        try {
            const {clothesId} = req.params;

            // Find all comments associated with the provided clothesId
            const comments = await Comments.find({ clothes: clothesId });

             return res.json(comments);
        }catch (e) {
            next(e)
        }
    }

    public async update(req:Request,res:Response,next:NextFunction):Promise<Response<IComments>>{
        try {
            const {commentsId} = req.params;
            const updatedData = req.body;
            const updatedComment = await commentsService.update(commentsId,updatedData);
            return res.status(200).json(updatedComment)
        }catch (e) {
            next(e)
        }
    }

    public async delete(req:Request,res:Response,next:NextFunction):Promise<Response<void>>{
        try {
            const {commentsId} = req.params;

            await commentsService.delete(commentsId);

            return res.sendStatus(204);
        }catch (e) {
            next(e)
        }
    }
}

export const commentsController = new CommentsController()