import { NextResponse } from  "next/server";
import { prisma } from "@/app/lib/prisma";

// display data for charts on the dashboard
export async function GET() {

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // get last 7 days
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);

       const entries = await prisma.timeEntry.findMany({
        where: {
            startTime: {gte: sevenDaysAgo },
        },
        orderBy: {startTime: "asc"},
       });

       // Group by day 
       const grouped: Record<string, number> = {};

        entries.forEach(e =>{
            if (!e.startTime || !e.endTime) return;

            const day = e.startTime.toLocaleDateString("en-US", {weekday: "short"});
            const diff = (new Date(e.endTime).getTime() - new Date(e.startTime).getTime()) / (1000 * 60 * 60);
            grouped[day] = (grouped[day] || 0) + diff;
        });

        const chartData = Object.entries(grouped).map(([day, hours]) => ({
            day,
            hours: parseFloat(hours.toFixed(2)),
        }))

        return NextResponse.json(chartData);
    }catch(err){
        return NextResponse.json({err: "Failed to fetch chart data"}, {status: 500})
    }
    

};

