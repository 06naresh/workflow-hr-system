import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// Get all time entries
export async function GET(){
    try{
        const entries = await prisma.timeEntry.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(entries);
    }catch(err){
        return NextResponse.json({error: 'Failed to fetch time entries'}, { status: 500 });
    }
}


// post a new time entry
export async function POST(req: Request){
    try{
        const body = await req.json();

        const { userId, startTime, endTime, duration, description } = body;

        const entry = await prisma.timeEntry.create({
            data:{
                userId,
                startTime: new Date(startTime),
                endTime: endTime ? new Date(endTime) : null,
                duration,
                description,
            },
        });

        return NextResponse.json(entry);
    }catch(err){
        return NextResponse.json({err: "failed to create time entry"}, {status: 500});
    }
}