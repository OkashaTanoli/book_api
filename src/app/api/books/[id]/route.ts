import sql from "@/util/neon"
import { NextResponse } from "next/server"


export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        let data = await sql`select * from books where id = ${params.id}`
        if (!data.length) {
            return NextResponse.json({ message: "No book found with this id" })
        }
        return NextResponse.json(data[0])
    }
    catch (err) {
        return NextResponse.json({ error: err })
    }
}
