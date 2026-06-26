import {NextResponse} from 'next/server';
import {prisma} from '@/app/lib/prisma';
import bcrypt from 'bcrypt';

// Get all employees
export async function GET(){
    try{
        const employees = await prisma.user.findMany();
        return NextResponse.json(employees);
    }catch(err){
        return NextResponse.json(
            {err: "Failed to fetch employees"},
            {status: 500}
        );
    }
}


// post a new employee
export async function POST(req: Request){
    try{
        const body = await req.json();

        const hashPassword = await bcrypt.hash(body.password,10);
        
        const newEmployee = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashPassword,
                role: body.role,
                department: body.department,
                status: "Active",
            },
        });

        return NextResponse.json(newEmployee);
        
    }catch(err){
        return NextResponse.json(
            {err: "Failed to create employee"},
            {status: 500}
        );
    }
}