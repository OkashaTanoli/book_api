import sql from "@/util/neon"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    let req = await request.json()
    let client = await sql`select * from clients where id = ${req.id} and email = ${req.email}`
    if (!client.length) {
        return NextResponse.json({ verified: false })
    }
    return NextResponse.json({ verified: true })
}
