import {IComments} from "../types/comments.types";
import {Comments} from "../models/Comments.model";
import {Types} from "mongoose";
import {ApiError} from "../error/api.error";
import {Clothes} from "../models/Clothes.model";



class CommentsService{
    public async create(data:IComments,userId:string){
        try {
            await Comments.create({...data,user:new Types.ObjectId(userId)})
        }catch (e) {
            throw new ApiError(e.message,e.status);
        }
    }

    public async getCommentsById(commentsId:string):Promise<IComments>{
        try{
          return await Clothes.findById(commentsId).populate({path:'user',select:["name","surname"]})
        }catch (e) {
            throw new ApiError(e.message,e.status);
        }
    }


}

export const commentsService = new CommentsService();