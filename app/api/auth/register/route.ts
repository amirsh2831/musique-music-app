import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    const {email, username, password} = body;
    console.log(body);

    const exists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if(exists){
        console.log("User exists")
        return new NextResponse('User Exists',{statusText: "User Exists", status: 200})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            username: username,
            email,
            password: hashedPassword,           
        }
    })
    return NextResponse.json({user});

};