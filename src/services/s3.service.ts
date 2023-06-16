import {DeleteObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {configs} from "../configs/config";
import {UploadedFile} from "express-fileupload";
import {v4} from "uuid";
import {extname} from "node:path"
import {Types} from "mongoose";




class S3Service{
    constructor(
        private client = new S3Client({
            region:configs.AWS_S3_REGION,
            credentials:{
                accessKeyId:configs.AWS_ACCESS_KEY,
                secretAccessKey:configs.AWS_SECRET_KEY
            }
        })
    ) {}

    public async uploadPhoto(file:UploadedFile,itemType:string,itemId:string):Promise<string>{
        const filePath = this.buildPath(file.name,itemType,itemId);
        await this.client.send(
            new PutObjectCommand({
                Bucket:configs.AWS_S3_BUCKET_NAME,
                Key:filePath,
                Body:file.data,
                ContentType:file.mimetype,
                ACL:configs.AWS_S3_ACL,
            })
        )
        return filePath;
    }

    public async deletePhoto(filePath:string):Promise<void>{
        await this.client.send(
            new DeleteObjectCommand({
                Bucket:configs.AWS_S3_BUCKET_NAME,
                Key:filePath,
            })
        )
    }

    public async uploadPhotos(file: UploadedFile, itemType: string, objectId:Types.ObjectId): Promise<string> {
        const filePath = this.buildPhotoPath(file.name, itemType, objectId);
        await this.client.send(
            new PutObjectCommand({
                Bucket: configs.AWS_S3_BUCKET_NAME,
                Key: filePath,
                Body: file.data,
                ContentType: file.mimetype,
                ACL: configs.AWS_S3_ACL,
            })
        );
        return filePath;
    }



    private buildPath(fileName:string,itemType:string,itemId:string):string{
        return `${itemType}/${itemId}/${v4()}${extname(fileName)}`
    }

    private buildPhotoPath(fileName:string,itemType:string,objectId:Types.ObjectId):string{
        return `${itemType}/${objectId}/${v4()}${extname(fileName)}`
    }

}

export const s3Service = new S3Service();