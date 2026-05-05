import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
        response.cookies.delete("access_token");
        return response;

    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
    }
}