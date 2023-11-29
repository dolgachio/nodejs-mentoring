import { RestMethods } from "../../../../constants/RestMethods";
import { store } from "../../../../store";
import { userByIdRegExp } from "../constants/userByIdRegExp";
import { getUserIdFromURL } from "./getUserIdFromURL";

export function isUserByIdURL(
  url: string,
  method: string,
  methodToMatch: RestMethods
): boolean {
  const isCorrectMethod = method === methodToMatch;

  if (!isCorrectMethod || !userByIdRegExp.test(url)) {
    return false;
  }

  const userId = getUserIdFromURL(url);
  const user = store.getUserById(userId || "");

  return !!user;
}
