import  db  from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {

        const { name, email } = await req.json();

        if (!name) {
            return new NextResponse("name is missing", { status: 401 });
        }
        if (!email) {
            return new NextResponse("email is missing", { status: 401 });
        }

        const user = await db.waitlist.create({
            data: {
                name,
                email
            }
        })
        

        return NextResponse.json(user)

    } catch (error) {
        console.log(`[JOB_POST] : ${error}`)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}