import {IUser} from "../types/user.types";
import {passwordService} from "./password.services";
import {User} from "../models/User.model";
import {ApiError} from "../error/api.error";
import {ICredentials} from "../types/auth.types";
import {ITokenPair, ITokenPayload} from "../types/token.types";
import {tokenService} from "./token.service";
import {Token} from "../models/Token.model";

class AuthService{
    public async register(body:IUser):Promise<void>{
        try {
            const {password} = body;
            const hashedPassword = await passwordService.hash(password);
            await User.create({...body,password:hashedPassword});
        }catch (e){
            throw new ApiError(e.message,e.status)
        }
    }

    public async login(
        credentials: ICredentials,
        user: IUser
    ): Promise<ITokenPair> {
        try {
            const isMatched = await passwordService.compare(
                credentials.password,
                user.password
            );

            if (!isMatched) {
                throw new ApiError("Invalid email or password", 409);
            }

            const tokenPair = tokenService.generateTokenPair({
                _id: user._id,
                name: user.name,
            });

            await Token.create({
                _user_id: user._id,
                ...tokenPair,
            });

            return tokenPair;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async refresh(tokenInfo:ITokenPair,jwtPayload:ITokenPayload):Promise<ITokenPair>{
        try {
            const tokenPair = tokenService.generateTokenPair({
                _id:jwtPayload._id,
                name:jwtPayload.name
            })
            await Promise.all([
                Token.create({_user_id:jwtPayload._id,...tokenPair}),
                Token.deleteOne({refreshToken:tokenInfo.refreshToken})
            ]);
            return tokenPair;
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }


    public async changePassword(userId:string,oldPassword:string,newPassword:string):Promise<void>{
      try {
          const user = await User.findById(userId);
          const isMathced = await passwordService.compare(oldPassword, user.password)
          if(!isMathced){
              throw new ApiError("Wrong old password",400);
          }
          const hashedNewPassword = await passwordService.hash(newPassword);
          await User.updateOne({_id:user._id},{password:hashedNewPassword})
      }catch (e) {
          throw new ApiError(e.message,e.status);
      }
    }
}

export const authService = new AuthService();