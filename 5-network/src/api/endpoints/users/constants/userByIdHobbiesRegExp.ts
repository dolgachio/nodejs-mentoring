import { uuidRegExpString } from "../../../../constants/uuidRegExpString";
import { Endpoints } from "../../Endpoints.enum";

export const userByIdHobbiesRegExp = new RegExp(`${Endpoints.Users}/${uuidRegExpString}${Endpoints.Hobbies}$`, "i");