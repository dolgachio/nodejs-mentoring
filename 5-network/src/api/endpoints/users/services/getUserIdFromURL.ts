import { Endpoints } from "../../Endpoints.enum";

export function getUserIdFromURL(url: string): string | null {
    const urlLowerCased = url.toLowerCase();
    
    const urlParts = urlLowerCased.split("/").filter((item) => !!item);
    
    if (urlParts.length !== 2 || `/${urlParts[0]}` !== Endpoints.Users) {
        return null;
    }


    return urlParts[1] || null;
}