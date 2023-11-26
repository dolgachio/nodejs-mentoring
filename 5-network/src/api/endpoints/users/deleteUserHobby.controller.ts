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
import { getHttpRequestBody } from "../../../utils/getHttoRequestBody";
import { isUserByIdHobbiesURL } from "./services/isUserByIdHobbiesURL";
import { DefaultDTO } from "../../../models/DefaultDTO";

const canHandle: CanHandleRequest = ({ method, url }) => {
  return isUserByIdHobbiesURL(url, method, RestMethods.DELETE);
};

const handleRequest: HandleRequest = async (req, res) => {
  try {
    const userId = getUserIdFromURL(req.url || "");
    const body = await getHttpRequestBody(req);
    const { data: hobbyToDelete }: DefaultDTO<string> = JSON.parse(body);

    const isUpdated = store.deleteUserHobby(userId || "", hobbyToDelete);

    if (isUpdated) {
      res.statusCode = StatusCodes.OK;
      setResponseContentTypeHeader(res, ContentTypes.Text);

      res.end(`User: ${userId} hobby: ${hobbyToDelete} deleted`);

      return;
    }

    res.statusCode = StatusCodes.NOT_MODIFIED;
    res.end();
  } catch (error) {
    throw new InternalServerError("Internal Server Error");
  }
};

export const deleteUserHobbyResource: Resource = [canHandle, handleRequest];
