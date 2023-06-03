import {NextFunction, Request, Response} from "express";
import {ApiError} from "../error/api.error";
import {tokenService} from "../services/token.service";
import {ETokenType} from "../enum/token.enum";
import {Token} from "../models/Token.model";

class AuthMiddleware{
    public async checkRefreshToken(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const refreshToken = req.get("Authorization");
            if(!refreshToken){
                throw new ApiError("No token",401);
            }
            const jwtPayload = tokenService.checkToken(
                refreshToken,
                ETokenType.refresh
            );

            const tokenInfo = await Token.findOne({refreshToken});
            if(!tokenInfo){
                throw new ApiError("Token not valid",401)
            }
            req.res.locals = {tokenInfo,jwtPayload};
            next();
        }catch (e) {
            next(e);
        }
    }
}
export const authMiddleware = new AuthMiddleware();