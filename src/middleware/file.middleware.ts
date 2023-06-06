import {NextFunction, Request, Response} from "express";
import {ApiError} from "../error/api.error";
import {avatarConfig} from "../configs/avatar.config";

class FileMiddleware{
    public isAvatarValid(req:Request,res:Response,next:NextFunction){
        try {
            if(!req.files){
                throw new ApiError("No files to upload",409)
            }
            if(Array.isArray(req.files.avatar)){
                throw new ApiError("You can upload only one photo",400)
            }

            const {size,mimetype,name} = req.files.avatar;
            if(size > avatarConfig.MAX_SIZE){
                throw new ApiError(`File ${name} is too big`,400);
            }
            if(!avatarConfig.MIMETYPES.includes(mimetype)){
                throw new ApiError(`File ${name} has invalid format`,400);
            }
            next();
        }catch (e) {
            next(e)
        }
    }
}

export const fileMiddleware = new FileMiddleware();