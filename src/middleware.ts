import NextAuth from "next-auth";
import { authConfig } from "@/app/authconfing";
import { NextRequest, NextResponse } from "next/server";

export default NextAuth(authConfig).auth as any;

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};
