import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// Put Employee by ID
export async function PUT(req: Request, context: { params: Promise<{ id:string }> }) {
    try{
        const body = await req.json();
        const { id, ...updateData } = body;

        const { id: paramId } = await context.params;
        const UpdateEmployee = await prisma.user.update({
            where:{ id: Number(paramId) },
            data: updateData,
        });

        return NextResponse.json(UpdateEmployee);

    }catch(err){
        console.error("PUT /api/employees error:", err);
        return NextResponse.json(
            {err: "Failed to update employee"},
            {status: 500}
        );
    }
}