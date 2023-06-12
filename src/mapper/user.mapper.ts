import {IUser} from "../types/user.types";
import {configs} from "../configs/config";

class UserMapper{
    public toResponse(user:IUser){
        return{
            _id: user._id,
            name: user.name,
            surname:user.surname,
            email: user.email,
            avatar: user.avatar ? `${configs.AWS_S3_BUCKET_URL}/${user.avatar}` : null,
        };
    }

    public toManyResponse(users: IUser[]) {
        return users.map(this.toResponse);
    }
}

export const userMapper = new UserMapper();


