import { Endpoints } from "../../Endpoints.enum";

export function isUsersURL(url: string): boolean {
    return url.startsWith(Endpoints.Users);
}