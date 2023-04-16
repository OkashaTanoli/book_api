import sql from "@/util/neon"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid';



export async function POST(request: Request) {
    // console.log("Custom Header ===>>>>>>> ", JSON.parse(request.headers.get('user') as string))
    const user: { id: string, email: string } = JSON.parse(request.headers.get('user') as string)
    let req = await request.json()
    const { bookId, customerName } = req
    let book = await sql`select * from books where id = ${bookId}`
    if (!book[0].available) {
        return NextResponse.json({ error: 'Book is out of stock' })
    }
    const id = uuidv4()
    try {
        let data = await sql`insert into orders (id, bookid, customername, createdby, quantity, timestamp) values (${id},${bookId},${customerName},${user.id},${1},${Date.now()})`
        return NextResponse.json({ created: true, orderId: id })
    }
    catch (err) {
        return NextResponse.json({ error: err })
    }
}


export async function GET(request: Request) {
    const user: { id: string, email: string } = JSON.parse(request.headers.get('user') as string)
    try {
        let data = await sql`select * from orders where createdBy = ${user.id}`
        return NextResponse.json(data)
    }
    catch (err) {
        return NextResponse.json({ error: err })
    }
}



