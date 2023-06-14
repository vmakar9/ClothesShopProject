import {Request,Response,NextFunction} from "express";
import {UploadedFile} from "express-fileupload";
import {userService} from "../services/user.service";
import {IUser} from "../types/user.types";
import {userMapper} from "../mapper/user.mapper";
import {User} from "../models/User.model";
import {ApiError} from "../error/api.error";
import {ITokenPayload} from "../types/token.types";

class UserController{
    public async uploadAvatar(req:Request,res:Response,next:NextFunction):Promise<Response<IUser>>{
      try {
          const userEntity = res.locals.user as IUser;
          const avatar = req.files.avatar as UploadedFile;
          const user  = await userService.uploadAvatar(avatar,userEntity);
          return res.status(201).json(user);
      }catch (e) {
          next(e);
      }
    }
    public async deleteAvatar(req:Request,res:Response,next:NextFunction):Promise<Response<IUser>>{
        try {
            const userEntity = res.locals.user as IUser;


            const user = await userService.deleteAvatar(userEntity);
            const response = userMapper.toResponse(user);

            return res.status(201).json(response);
        }catch (e) {
            next(e)
        }
    }

   public async update(req:Request,res:Response,next:NextFunction):Promise<Response<IUser>>{
        try {
            const {_id} = req.res.locals.jwtPayload as ITokenPayload;
            const {userId} = req.params;

            if(_id !=  userId){
                throw new ApiError("Access denied",401)
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {...req.body},
                {new:true}
            );

            return res.status(201).json(updatedUser)
        }catch (e) {
            next(e);
        }
   }

}
export const userController = new UserController();