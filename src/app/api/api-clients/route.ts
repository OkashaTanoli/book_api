import sql from "@/util/neon"
import { NextResponse } from "next/server"
import { SignJWT } from 'jose';
import { v4 as uuidv4 } from 'uuid';




export async function POST(request: Request) {
    let req = await request.json()
    let client = await sql`select * from clients where email = ${req.email}`
    if (client.length) {
        return NextResponse.json({ error: "User already exists with this email" })
    }
    try {
        let id = uuidv4()
        let client = await sql`insert into clients (id, email, name) values (${id},${req.email},${req.name})`
        // const token = jwt.sign(
        //     {
        //         email: req.email,
        //     },
        //     process.env.NEXT_PUBLIC_JWT_KEY as string
        // )

        const token = await new SignJWT({ email: req.email, id })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_KEY as string))
        return NextResponse.json({ accessToken: token })
    }
    catch (err) {
        return NextResponse.json({ error: err })
    }
}
