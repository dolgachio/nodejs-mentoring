import { ContentTypes } from "../../../constants/ContentTypes";
import { RestMethods } from "../../../constants/RestMethods";
import { uuidRegExpString } from "../../../constants/uuidRegExpString";
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
import { isUserByIdURL } from "./services/isUserByIdURL";
import { UserCore } from "../../../models";
import { handleNotFound } from "../notFound";

const canHandle: CanHandleRequest = ({ method, url }) => {
  return isUserByIdURL(url, method, RestMethods.GET);
};

const handleRequest: HandleRequest = async (req, res) => {
  try {
    const userId = getUserIdFromURL(req.url || "");
    const user = store.getUserById(userId || "");

    if (user) {
      const userCore: UserCore = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      res.statusCode = StatusCodes.OK;
      setResponseContentTypeHeader(res, ContentTypes.JSON);
      res.end(JSON.stringify(userCore));

      return;
    }

    handleNotFound(req, res);
  } catch (error) {
    throw new InternalServerError("Internal Server Error");
  }
};

export const getUserResource: Resource = [canHandle, handleRequest];
