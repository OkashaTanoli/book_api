import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';


export async function middleware(request: NextRequest) {
    const token = request.headers.get('authorization')?.split(' ')[1] as string
    try {
        // const decoded = await jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY as string)
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_KEY as string));
        const response = await fetch('https://okasha-books-api.vercel.app/api/checkuser',
            {
                method: 'POST',
                body: JSON.stringify({ id: payload.id, email: payload.email })
            }
        )
        const data = await response.json()
        if (!data.verified) {
            return NextResponse.json({
                message: "Auth Failed"
            })
        }

        const headers = new Headers(request.headers);
        headers.set('user', JSON.stringify(payload))

        const resp = NextResponse.next({
            request: {
                headers
            }
        });
        return resp;
        // return NextResponse.next();
    }
    catch (err) {
        return NextResponse.json({
            message: 'Auth Failed'
        })
    }

    // return NextResponse.next();
    // return NextResponse.redirect(new URL('/about-2', request.url))
}

export const config = {
    matcher: ['/api/orders', '/api/orders/:id*'],
}