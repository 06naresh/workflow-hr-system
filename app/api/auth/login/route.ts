import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


export async function POST(req: Request){
    try{

        const body = await req.json();

        const {email,password} = body;

        // validation
        if (!email || !password){
            return NextResponse.json(
                {error: "Email and password are required!"},
                {status: 400}
            );
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: {email},
        });

        // User not found
        if (!user){
            return NextResponse.json(
                {error: "Invalid credentials!"},
                {status: 400}
            );
        }

        // Compare password
        const PasswordMatch = await bcrypt.compare(password, user.password);

        if(!PasswordMatch){
            return NextResponse.json(
                {error: "Invalid credentials!"},
                {status: 400}
            );
        }

        return NextResponse.json({
          message: "Login Successful!",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });

    }catch(err){
        console.log(err);

        return NextResponse.json(
            {error: "Something went wrong!"},
            {status: 500}
        );
    }
}