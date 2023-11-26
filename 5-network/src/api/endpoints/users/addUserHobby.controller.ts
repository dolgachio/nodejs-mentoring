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

// Endpoint
// PUT/PATCH: /users/${userId}/hobbies
const canHandle: CanHandleRequest = ({ method, url }) => {
  return (
    isUserByIdHobbiesURL(url, method, RestMethods.PUT) ||
    isUserByIdHobbiesURL(url, method, RestMethods.PATCH)
  );
};

const handleRequest: HandleRequest = async (req, res) => {
  try {
    const userId = getUserIdFromURL(req.url || "");
    const body = await getHttpRequestBody(req);
    const { data: newHobby }: DefaultDTO<string> = JSON.parse(body);

    const isUpdated = store.addUserHobby(userId || "", newHobby);

    if (isUpdated) {
      res.statusCode = StatusCodes.OK;
      setResponseContentTypeHeader(res, ContentTypes.Text);

      res.end(`User: ${userId} hobby: ${newHobby} added`);

      return;
    }

    res.statusCode = StatusCodes.NOT_MODIFIED;
    res.end();
  } catch (error) {
    throw new InternalServerError("Internal Server Error");
  }
};

export const addUserHobbyResource: Resource = [canHandle, handleRequest];
