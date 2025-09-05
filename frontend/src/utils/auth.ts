// frontend/src/utils/auth.ts
import { jwtDecode } from "jwt-decode";

export function getUsernameFromToken(): string | null {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded: any = jwtDecode(token);
        return decoded.name || null;
    } catch (e) {
        console.error("Invalid token", e);
        return null;
    }
}
