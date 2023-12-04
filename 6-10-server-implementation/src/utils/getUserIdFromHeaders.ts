import { userIdHeader } from "../constants/userIdHeader";

export function getUserIdFromHeaders(headers: { [key: string]: string | string[] | undefined }): string {
     const userId = headers[userIdHeader];

     if (!userId || Array.isArray(userId)) {
        return "";
     }

     return userId;
}