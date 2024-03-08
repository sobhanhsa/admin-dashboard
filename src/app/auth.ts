import NextAuth, { NextAuthConfig, NextAuthResult, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfing";
import { connectToDB } from "../utils/db/utils";
import { UserModel, UserType } from "../utils/db/models";
import * as bcrypt from "bcrypt";
import {} from "../../node_modules/next-auth/lib";

const login = async (credentials:{
    username:string,
    password:string
}) => {
    try {
        connectToDB();

        console.log("authenticating",credentials)

        const user : UserType | null = await UserModel.findOne({
            username:credentials.username
        });

        if (!user) throw new Error("invalid username");

        if  (!  (await bcrypt.compare(
                    credentials.password,
                    user.password
                    )
                )
            )
        {
            throw new Error("incorrect password")
        };

        // console.log(user);

        return user;

    } catch (err:any&Error) {
        // console.error(err);
        throw new Error(`failed to login ${err.message}`);
    }
};

const authMod = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider(
            {
                async authorize(credentials) {
                    try {
                        const user = await login(credentials as any);
                        console.log(user , "sdfsdfkj;")
                        return {
                            email:user.email,
                            username:user.username,
                            img:user.img
                        };
                    } catch (err:any&Error) {
                        // console.log(err.message);
                        return null;
                    }
                }
            }
        )
    ],
    callbacks: {
        async jwt({ token, user }:any) {
            if (user) {
                token.username = user.username;
                token.img = user.img;
            }
            return token;
        },
        async session({ session, token }:any) {
            if (token) {
                session.user.username = token.username;
                session.user.img = token.img;
            }
            return session;
        },
    },
});

export const {signIn,signOut} :NextAuthResult = authMod;
    
export const {auth} : any&{ auth:Promise<Session | null>} = authMod;

