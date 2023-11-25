import { uuidRegExpString } from "../../../../constants/uuidRegExpString";
import { Endpoints } from "../../Endpoints.enum";

export const userByIdRegExp = new RegExp(`${Endpoints.Users}/${uuidRegExpString}`, "i");