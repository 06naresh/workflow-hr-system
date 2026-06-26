import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// Display summary cards on the dashboard
export async function GET() {
    const totalEmployees = await prisma.user.count();
    const activeEmployees = await prisma.user.count({
        where: { status: "Active" }
    });
    const totalEntries = await prisma.timeEntry.count();

    const today = new Date();
    today.setHours(0, 0, 0, 0);


    const entries = await prisma.timeEntry.findMany({
        where: {startTime: { gte: today}},
    });

    const totalms = entries.reduce((acc, e) =>{

        if (!e.endTime) return acc; // skip if null

        const diff = (new Date(e.endTime).getTime() - new Date(e.startTime).getTime());
        return acc + diff;
    }, 0);


    function formatHours(ms: number) {
        const totalSeconds = Math.floor(ms / 1000);
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor(totalSeconds % 3600);
        const s = Math.floor(totalSeconds % 60);
        return `${h}h ${m}m ${s}s`
    }

    const totalHoursToday = formatHours(totalms);

    
    return NextResponse.json({
        totalEmployees, activeEmployees, totalEntries, totalHoursToday
    });
}