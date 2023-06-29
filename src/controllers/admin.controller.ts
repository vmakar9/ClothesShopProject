import {NextFunction,Request,Response} from "express";
import {adminService} from "../services/admin.service";
import {IUser} from "../types/user.types";


class AdminController{
    public async banUser(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {userId} = req.params
            await adminService.banUser(userId);
            res.sendStatus(200);
        }catch (e) {
            next(e)
        }
    }

    public async getAll(req:Request,res:Response,next:NextFunction):Promise<Response<IUser[]>>{
        try {
            const users = await adminService.getAllUsers();
            return res.status(200).json(users)
        }catch (e) {
            next(e);
        }
    }

    public async getBanedUsers(req:Request,res:Response,next:NextFunction):Promise<Response<IUser[]>>{
        try{
            const users = await adminService.getBanedUsers();
            return res.status(200).json(users);
        }catch (e) {
            next(e)
        }
    }

    public async unBanUser(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {userId} = req.params;
            await adminService.unBanUser(userId);
            res.sendStatus(200);
        }catch (e) {
            next(e)
        }
    }

}
export const adminController = new AdminController();