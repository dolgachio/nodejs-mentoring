import { RestMethods } from "../../../../constants/RestMethods";
import { store } from "../../../../store";
import { userByIdHobbiesRegExp } from "../constants/userByIdHobbiesRegExp";
import { getUserIdFromURL } from "./getUserIdFromURL";

export function isUserByIdHobbiesURL(
  url: string,
  method: string,
  methodToMatch: RestMethods
): boolean {
  const isCorrectMethod = method === methodToMatch;

  if (!isCorrectMethod || !userByIdHobbiesRegExp.test(url)) {
    return false;
  }

  const userId = getUserIdFromURL(url);
  const user = store.getUserById(userId || "");

  return !!user;
}
