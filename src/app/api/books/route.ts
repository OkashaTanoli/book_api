import sql from "@/util/neon"
import { NextResponse } from "next/server"


export async function GET(request: Request) {
    try {
        let data = await sql`select * from books`
        return NextResponse.json(data)
    }
    catch (err) {
        return NextResponse.json({ error: err })
    }
}
