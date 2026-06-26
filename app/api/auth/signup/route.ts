
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
    try{
        const body = await req.json();

            const {
        name,
        email,
        password,
        role,
        department,
        } = body;


        // validations 
        if (!name || !email || !password){
            return NextResponse.json(
                {error: "Required fields are missing"},
                {status: 400}
            );
        }

        // check were user already exist or not 
        const existingUser = await prisma.user.findUnique({
            where: {email},
        });

        if (existingUser){
            return NextResponse.json(
                {error: "User already exist"},
                {status: 400}
            );
        }


        // Hash password 
        const HashPassword = await bcrypt.hash(password, 10);


        // user created
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: HashPassword,
                role,
                department,
            },
        });

        return NextResponse.json({
            message: "User Created Succcesfully",
            user,
        });
    
    } catch(error) {
        console.log(error);

        return NextResponse.json(
            {error: "Something went wrong"},
            {status: 500}
        );
    }
}