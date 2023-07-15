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

    public isClothesPhotoValid(req:Request,res:Response,next:NextFunction){
        try {
            const photos = req.files.photos;

            if (!photos) {
                throw new ApiError("The photo was not uploaded.",400)
            }

            if ("mimetype" in photos && photos.mimetype !== 'image/jpeg' && photos.mimetype !== 'image/png') {
                throw new ApiError("Invalid file type. Only JPEG and PNG are allowed.",400)
            }

            const maxSize = 5 * 1024 * 1024;
            if ("size" in photos && photos.size > maxSize) {
                throw new ApiError("The file size exceeds the maximum allowed size (5 MB).",400)
            }
            next();
        }catch (e) {
            next(e)
        }
    }

    public isCommentsPhotoValid(req:Request,res:Response,next:NextFunction){
        try {
            const photos = req.files.photos;


            if (!photos) {
                throw new ApiError("The photo was not uploaded.",400)
            }


            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes("mimetype" in photos && photos.mimetype)) {
                throw new ApiError("Invalid file type. Only JPEG and PNG are allowed.",400)
            }


            const maxSize = 5 * 1024 * 1024;
            if ("size" in photos && photos.size > maxSize) {
                throw new ApiError("The file size exceeds the maximum allowed size (5 MB).",400)
            }


            next();
        }catch (e) {
            next(e)
        }
    }


}

export const fileMiddleware = new FileMiddleware();