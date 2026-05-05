import { cookies } from "next/headers";
import { scalekit } from "./scalekit"; 

export async function getSession() {
    const cookieStore = await cookies();    
    const token = cookieStore.get('access_token')?.value;
    if (!token) {
        return null;
    }

    try {
        // Validate the extracted token
        const result = await scalekit.validateToken(token);
        const userId = (result as { sub: string }).sub;
        
        // Fetch the full user profile using the validated ID
        const user = await scalekit.user.getUser(userId);
        return user;
        
    } catch (error) {
        console.error("Session validation error:", error);
        return null;
    }      
}