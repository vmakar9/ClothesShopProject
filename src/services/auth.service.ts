import {IUser} from "../types/user.types";
import {passwordService} from "./password.services";
import {User} from "../models/User.model";
import {ApiError} from "../error/api.error";
import {ICredentials} from "../types/auth.types";
import {ITokenPair} from "../types/token.types";
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
}

export const authService = new AuthService();