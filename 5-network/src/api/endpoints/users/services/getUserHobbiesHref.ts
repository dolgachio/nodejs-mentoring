import { baseAppURL } from "../../../../constants/PORT";
import { Endpoints } from "../../Endpoints.enum";

export function getUserHobbiesHref(userId: string): string {
    return `${baseAppURL}${Endpoints.Users}/${userId}${Endpoints.Hobbies}`;
}