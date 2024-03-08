"use server"

import { signIn , signOut } from "@/app/auth";
import { redirect } from "next/navigation";



export const authenticate = async (prevState:any,formData:FormData)=> {
    
    const {username,password} = Object.fromEntries(formData);

    try {
        
        // const user = await UserModel.findOne({
        //     username:username
        // });

        await signIn("credentials",{
            username,
            password
        });
        
    } catch (err:any&Error) {
        console.log(err)
        if (err.message.includes("NEXT_REDIRECT")) return redirect("/dashboard");
        if ((err.message as string).toLowerCase().includes("credentialssignin")) {
            return "Wrong Credentials";
        }
        throw err;
    }
    
}

export const logOut = async () => {
    await signOut();
}