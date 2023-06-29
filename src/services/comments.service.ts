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

    // public async getCommentsById(clothesId:string):Promise<IComments>{
    //     try{
    //         return await Comments.find({clothes: clothesId});
    //     }catch (e) {
    //         throw new ApiError(e.message,e.status);
    //     }
    // }

    public async update(commentId:string,updatedData:IComments){
        try {
            await Comments.findByIdAndUpdate(commentId,updatedData);
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }

    public async delete(commentId:string){
        try {
            await Comments.findByIdAndDelete(commentId)
        }catch (e) {
            throw new ApiError(e.message,e.status)
        }
    }




}

export const commentsService = new CommentsService();