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
import { isUserByIdURL } from "./services/isUserByIdURL";

// Endpoint
// DELETE: /users/${userId}
const canHandle: CanHandleRequest = ({ method, url }) => {
  return isUserByIdURL(url, method, RestMethods.DELETE);
};

const handleRequest: HandleRequest = async (req, res) => {
  try {
    const userId = getUserIdFromURL(req.url || "");
    store.deleteUser(userId || "");

    res.statusCode = StatusCodes.OK;
    setResponseContentTypeHeader(res, ContentTypes.Text);
    res.end("User Action Performed");
  } catch (error) {
    throw new InternalServerError("Internal Server Error");
  }
};

export const deleteUserResource: Resource = [canHandle, handleRequest];
