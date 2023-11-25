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
import { getHttpRequestBody } from "../../../utils/getHttoRequestBody";

const canHandle: CanHandleRequest = ({ method, url }) => {
  return (
    isUserByIdURL(url, method, RestMethods.PUT) ||
    isUserByIdURL(url, method, RestMethods.PATCH)
  );
};

const handleRequest: HandleRequest = async (req, res) => {
  try {
    const userId = getUserIdFromURL(req.url || "");
    const body = await getHttpRequestBody(req);
    const userPatch = JSON.parse(body);

    const isUpdated = store.updateUser(userId || "", userPatch);

    if (isUpdated) {
      res.statusCode = StatusCodes.OK;
      setResponseContentTypeHeader(res, ContentTypes.Text);

      res.end(`User: ${userId} updated`);

      return;
    }

    res.statusCode = StatusCodes.NOT_MODIFIED;
    res.end();
  } catch (error) {
    throw new InternalServerError("Internal Server Error");
  }
};

export const updateUserResource: Resource = [canHandle, handleRequest];
