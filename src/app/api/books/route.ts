import sql from "@/util/neon"
import { NextResponse } from "next/server"
import postgres from "postgres";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = searchParams.get('limit');

    try {
        let data: postgres.RowList<postgres.Row[]>;
        if (type && limit) {
            data = await sql`select * from books where type = ${type} limit ${limit}`
        }
        else if (type) {
            data = await sql`select * from books where type = ${type}`
        }
        else if (limit) {
            data = await sql`select * from books limit ${limit}`
        }
        else {
            data = await sql`select * from books`
        }
        return NextResponse.json(data)
    }
    catch (err) {
        return NextResponse.json({ error: err })
    }
}
