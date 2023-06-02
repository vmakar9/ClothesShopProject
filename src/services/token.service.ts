import {ITokenPair, ITokenPayload} from "../types/token.types";
import * as jwt from "jsonwebtoken"
import {configs} from "../configs/config";
class TokenService{
    public generateTokenPair(payload:ITokenPayload):ITokenPair{
        const accessToken = jwt.sign(payload,configs.JWT_ACCESS_KEY,{
            expiresIn:"15m"
        });
        const refreshToken = jwt.sign(payload,configs.JWT_REFRESH_SECRET,{
            expiresIn:"30d",
        });
        return {
            accessToken,
            refreshToken
        };
    }
}

export const tokenService= new TokenService();