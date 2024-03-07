"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UserModel } from "../../models";
import { connectToDB } from "../../utils";
import * as bcrypt from "bcrypt";

export const addUser = async(formData:FormData) => {
    const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

    try{
        connectToDB();

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password as string,salt);

        const user = new UserModel({
            username,
            email,
            password: hash,
            phone,
            address,
            isAdmin,
            isActive,
        });

        await user.save();
    }catch(e){
        console.error(e);
        throw new Error("failed to create a user")
    }       

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users")
}   
export const updateUser = async(
        formData:FormData
    ) => {
    const { id,username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);


    try{

        connectToDB();

        const updateFields = {
            username,
            email,
            phone,
            address,
            isAdmin : isAdmin == "true" ? true : false,
            isActive: isActive == "true" ? true : false,
        };

        type updateFieldsKeysType =  keyof typeof updateFields;

        Object.keys(updateFields).forEach(
            ( key : any) => {
                

                (updateFields[key as updateFieldsKeysType] === "" || undefined) 
                &&
                delete updateFields[key as updateFieldsKeysType];
            }
        );

        const user = await UserModel.findByIdAndUpdate(id,updateFields);

        // console.log(updateFields)

    }catch(e){
        console.error(e);
        throw new Error("failed to update a user")
    }       

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users")
}   

export const deleteUser = async(formData:FormData) => {
    
    console.log(formData);
    
    const {id} = Object.fromEntries(formData);

    try {
        connectToDB();
        const user = await UserModel.findByIdAndDelete(id);
        console.log(`${user.username} succesfully deleted`);
    } catch (e) {
        console.error(e);
        throw new Error("failed to delete a user");
    }

    revalidatePath("/dashboard/users");
}