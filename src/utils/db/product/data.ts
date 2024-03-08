import { ProductModel } from "../models"
import { connectToDB } from "../utils";

export const  createProd = async () => {
    connectToDB();
    try {
        await ProductModel.create([
            {
                title:"bike",
                desc:"an awesoem mountain bike",
                price:600,
                stock:6
            },
            {
                title:"Pphone",
                desc:"better than iphone",
                price:600,
                stock:6
            },
            {
                title:"keyboard",
                desc:"an awesoem gaming keyboard",
                price:600,
                stock:6
            }
        ]);
    } catch (e) {
        throw e;
    }
}

export const getProducts = async(q:string,p:number) => {
    connectToDB();
    try {
        const ITEM_PER_PAGE = 1;
        const reg = new RegExp(q,"i")
        const prodcuts = await ProductModel.find({
            title:{
                $regex:reg
            }
        }).limit(ITEM_PER_PAGE*2).skip(ITEM_PER_PAGE * (p-1));
        return prodcuts
    } catch(e) {
        throw e;
    }
    
}


export const getProductById = async(id:string) => {
    connectToDB();
    try {
        const prodcut = await ProductModel.findById({
            _id:id
        });
        return prodcut;
    }catch(e:any){
        throw e
    }
}
