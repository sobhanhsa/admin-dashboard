"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProductModel } from "../../models";
import { connectToDB } from "../../utils";

export const addProduct = async(formData:FormData) => {
    const { 
        title,
        desc,
        price,
        stock,
        img,
        color,
        size,
    } = Object.fromEntries(formData);

    try{
        connectToDB();

        const product = new ProductModel({
            title,
            desc,
            price,
            stock,
            img,
            color,
            size,
        });

        await product.save();
    }catch(e){
        console.error(e);
        throw new Error("failed to create a product")
    }       

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products")
}   
export const updateProduct = async(
        formData:FormData
    ) => {
    const { 
        id,
        title,
        desc,
        price,
        stock,
        img,
        color,
        size, 
    } = Object.fromEntries(formData);


    try{

        connectToDB();

        const updateFields = {
            title,
            desc,
            price,
            stock,
            img,
            color,
            size,
        };

        if (!id) throw new Error("id is not provided");
        
        type updateFieldsKeysType =  keyof typeof updateFields;
        
        Object.keys(updateFields).forEach(
            ( key : any) => {
                
                (updateFields[key as updateFieldsKeysType] === "" || undefined) 
                &&
                delete updateFields[key as updateFieldsKeysType];
            }
            );
            
            const product = await ProductModel.findByIdAndUpdate(id,updateFields);
            
            // console.log(updateFields)
            
        }catch(e:any){
            console.error(e);
        throw new Error(`failed to update a product\n${e.message}`)
    }       
    
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products")
}   

export const deleteProduct = async(formData:FormData) => {
    
    const {id} = Object.fromEntries(formData);
    
    if (!id) throw new Error("id is not provided");
    
    try {
        connectToDB();
        const product = await ProductModel.findByIdAndDelete(id);
        console.log(`${product.title} succesfully deleted`);
    } catch (e:any) {
        console.error(e);
        throw new Error(`failed to delete a product\n${e.message}`);
    }

    revalidatePath("/dashboard/products");
}