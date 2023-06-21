import {Request,Response,NextFunction} from "express";
import {Comments} from "../models/Comments.model";
import {ApiError} from "../error/api.error";

class CommentsMiddleware{
    public async gedIdOrThrow(req:Request,res:Response,next:NextFunction){
        try{
            const {commentsId} = req.params;
            const comments = await Comments.findById(commentsId)

            if(!comments){
                throw  new ApiError("Comment not found",422)
            }

            res.locals.comments = comments;
            next()
        }catch (e) {
            next(e)
        }
    }
}

export const commentsMiddleware = new CommentsMiddleware();