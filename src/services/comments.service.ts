import {IComments} from "../types/comments.types";
import {Comments} from "../models/Comments.model";
import {Types} from "mongoose";
import {ApiError} from "../error/api.error";




class CommentsService{
    public async create(data:IComments,userId:string,clothesId:string){
        try {
            await Comments.create({...data,user:new Types.ObjectId(userId),clothes:clothesId})
        }catch (e) {
            throw new ApiError(e.message,e.status);
        }
    }

    public async getCommentsById(commentsId:string,userId:string,clothesId:string):Promise<IComments>{
        try{
              const result = await Comments.aggregate([
                  {
                      $match:{
                          _id:commentsId,
                          user:new Types.ObjectId(userId),
                          clothes:new Types.ObjectId(clothesId)
                      },
                  },
                  {
                      $lookup:{
                          from:"users",
                          localField:"user",
                          foreignField:"_id",
                          as:"user",
                      }
                  },
                  {
                      $lookup:{
                          from:"clothes",
                          localField:"clothes",
                          foreignField:"_id",
                          as:"clothes"
                      }
                  },
                  {
                      $unwind:{
                          path:"$user"
                      }
                  },
                  {
                      $unwind:{
                          path:"$clothes"
                      }
                  }
              ])
            return result[0];
        }catch (e) {
            throw new ApiError(e.message,e.status);
        }
    }


}

export const commentsService = new CommentsService();