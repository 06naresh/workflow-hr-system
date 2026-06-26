import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// get a single time entry by id
export async function GET(_: Request, {params}: {params: {id: string}}) {
    try{
        const entry = await prisma.timeEntry.findUnique({
            where: {id: Number(params.id)},
        });

        return NextResponse.json(entry);
    }catch(err){
        return NextResponse.json({err: "Entry not found"}, {status: 404});
    }
}

// put update a time entry by id
export async function PUT(req:Request, {params}: {params: {id: string}}){
    try{
        const body = await req.json();
        const entry = await prisma.timeEntry.update({
            where: {id: Number(params.id)},
            data: body,
        });

        return NextResponse.json(entry);
    }catch(err){
        return NextResponse.json({err: "Failed to update entry"}, {status: 500});
    }
}

// delete a time entry by id
export async function DELETE(_: Request, {params}: {params: {id: string}}){
    try{
        await prisma.timeEntry.delete({
            where: {id: Number(params.id)},
        });

        return NextResponse.json({message: "Entry deleted"});
    }catch(err){
        return NextResponse.json({err: "Failed to delete entry"}, {status: 500});
    }
}