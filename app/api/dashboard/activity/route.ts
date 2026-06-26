import { NextResponse} from "next/server";
import { prisma } from "@/app/lib/prisma";

// display recent activity on the dashboard
export async function GET() {

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);


        const activities = await prisma.timeEntry.findMany({
            where: {
                startTime: {
                    gte: today,
                },
            },
            orderBy: { startTime: "desc" },
            include: {user: true},
        });

        const formatted = activities.map(a => ({
            name: a.user?.name ?? `User ${a.userId}`,
            action: a.endTime ? "Stopped" : "Started",
            time: a.startTime?.toISOString() ?? "",
            status: a.endTime ? "Done" : "Active",
        }));

        return NextResponse.json(formatted);
    }   catch(err) {
    return NextResponse.json({err: "Failed to fetch activity"}, {status: 500});             
    }
    
}