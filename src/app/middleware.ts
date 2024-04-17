import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = process.env.NODE_ENV == "production" ? ["https://matkajuju.com","https://www.matkajuju.com"] : ["http://localhost:3000"]
export default function middleware(req: any) {
    // console.log(req.nextUrl.pathname , "middleware")
    // console.log(req.nextauth.token?.role)
    let origin = req.headers.get("origin");
    if(origin && !allowedOrigins.includes(origin)){

     return   new Response(null,{
            status: 400,
            statusText: "Bad Request!",
            headers:{
                "Content-Type" : "plain/text"
            }
        })
    }
    if(req.nextUrl.pathname.startsWith("/admin") && (req.nextauth.token?.role == "user")){
        return NextResponse.rewrite(new URL("/",req.url)) 
    }
    return NextResponse.next()
}
// {
//     callbacks:{
//         authorized:({token}) => !!token
//     }
// }
// )

export const config = {
    matcher: [      
        "/api/:path*",
        "/admin/:path*", 
]
}