import { ContentTypes } from "../../../constants/ContentTypes";
import { RestMethods } from "../../../constants/RestMethods";
import { InternalServerError } from "../../../models/InternalServerError";
import {
  Resource,
  HandleRequest,
  CanHandleRequest,
} from "../../../models/Resource.model";
import { store } from "../../../store";
import { setResponseContentTypeHeader } from "../../../utils/setResponseContentTypeHeader";
import { getUserIdFromURL } from "./services/getUserIdFromURL";
import { StatusCodes } from "http-status-codes";
import { isUserByIdHobbiesURL } from "./services/isUserByIdHobbiesURL";
import { DefaultDTO } from "../../../models/DefaultDTO";
import { handleNotFound } from "../notFound";

const canHandle: CanHandleRequest = ({ method, url }) => {
  return isUserByIdHobbiesURL(url, method, RestMethods.GET);
};

const handleRequest: HandleRequest = async (req, res) => {
  try {
    const userId = getUserIdFromURL(req.url || "") || "";
    const userHobbies = store.getUserHobbies(userId);

    if (!userHobbies) {
      handleNotFound(req, res);

      return;
    }

    res.statusCode = StatusCodes.OK;
    setResponseContentTypeHeader(res, ContentTypes.JSON);
    res.end(JSON.stringify({ data: userHobbies }));
  } catch (error) {
    throw new InternalServerError("Internal Server Error");
  }
};

export const getUserHobbiesResource: Resource = [canHandle, handleRequest];
