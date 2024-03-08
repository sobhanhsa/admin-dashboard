import { UserModel } from "../models"
import { connectToDB } from "../utils";

export const getUsers = async(q:string,p:number) => {
    connectToDB();
    try {
        const ITEM_PER_PAGE = 1;
        const reg = new RegExp(q,"i")
        const users = await UserModel.find({
            username:{
                $regex:reg
            }
        }).limit(ITEM_PER_PAGE*2).skip(ITEM_PER_PAGE * (p-1));
        return users
    } catch(e) {
        throw e;
    }
    
}


export const getUserById = async(id:string) => {
    connectToDB();
    try {
        const user = await UserModel.findById({
            _id:id
        });
        return user;
    }catch(e:any){
        throw e
    }
}
