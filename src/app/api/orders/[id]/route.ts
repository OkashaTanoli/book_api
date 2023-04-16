import sql from "@/util/neon"
import { NextResponse } from "next/server"


export async function GET(request: Request, { params }: { params: { id: string } }) {
    const user: { id: string, email: string } = JSON.parse(request.headers.get('user') as string)
    try {
        let data = await sql`select * from orders where id = ${params.id} and createdBy = ${user.id}`
        if (!data.length) {
            return NextResponse.json({ error: 'No order with this ID' })
        }
        return NextResponse.json(data[0])
    }
    catch (err) {
        return NextResponse.json({ error: err })

    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    let req = await request?.json()
    const user: { id: string, email: string } = JSON.parse(request.headers.get('user') as string)
    try {
        let data = await sql`update orders set customerName = ${req.customerName} where id = ${params.id} and createdBy = ${user.id} returning *`
        if (!data.length) {
            return NextResponse.json({ error: 'No order with this ID' })
        }
        return NextResponse.json({ updated: true })
    }
    catch (err) {
        return NextResponse.json({ error: err })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const user: { id: string, email: string } = JSON.parse(request.headers.get('user') as string)
    try {
        let data = await sql`delete from orders where id = ${params.id} and createdBy = ${user.id}`
        return NextResponse.json({ deleted: true })
    }
    catch (err) {
        return NextResponse.json({ error: err })
    }
}





