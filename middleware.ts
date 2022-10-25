import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { jwtVerify } from 'jose'


export async function middleware(request: NextRequest) {

    const myJWT = request.cookies.get('token') || undefined;

    if (
        request.nextUrl.pathname === '/' 
        || request.nextUrl.pathname.includes('/todo')
        || request.nextUrl.pathname.includes('/messages')
    ) 
    {
        // This will apply only for /,/todo,/messages routes. Which means that they are going to be private
        if (!myJWT) {
            // If there is nothing in the token go to login
            return NextResponse.redirect(new URL('/login', request.url))
        }
        
        try {
            await jwtVerify(myJWT, new TextEncoder().encode(process.env.JWT_SECRET_KEY || ""));
            return NextResponse.next();
            
        } catch( error ){
            console.log('error in middleware', error);

            request.cookies.clear();
            return NextResponse.redirect(new URL('/login', request.url))
        }   

    } else if (request.nextUrl.pathname.includes('/login')) {
        
        if (myJWT) {
            // If you are authenticated. then go to home page
            try {
                await jwtVerify(myJWT, new TextEncoder().encode(process.env.JWT_SECRET_KEY || ""));
                return NextResponse.redirect(new URL('/', request.url))
                
            } catch( error ){
                // if not, continue in login
                request.cookies.clear();
                
                console.log('error in middleware', error)
            }   
        }
    }

    NextResponse.next();
}

export const config = {
    matcher: ['/', '/todo', '/messages', '/general', '/login'],
}