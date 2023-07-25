import {Request,Response,NextFunction} from "express";
import {UploadedFile} from "express-fileupload";
import {userService} from "../services/user.service";
import {IUser} from "../types/user.types";
import {userMapper} from "../mapper/user.mapper";
import {User} from "../models/User.model";



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

            const {userId} = req.params;

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

    public async getById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<IUser>> {
        try {
            const { user } = res.locals;

            const response = userMapper.toResponse(user);

            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    public async getAll(req:Request,res:Response,next:NextFunction):Promise<Response<IUser[]>>{
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json(users)
        }catch (e) {
            next(e);
        }
    }


}
export const userController = new UserController();