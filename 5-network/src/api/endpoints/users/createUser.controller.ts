import { ContentTypes } from "../../../constants/ContentTypes";
import { RestMethods } from "../../../constants/RestMethods";
import { InternalServerError } from "../../../models/InternalServerError";
import {
  Resource,
  HandleRequest,
  CanHandleRequest,
} from "../../../models/Resource.model";
import { store } from "../../../store";
import { getHttpRequestBody } from "../../../utils/getHttoRequestBody";
import { setResponseContentTypeHeader } from "../../../utils/setResponseContentTypeHeader";
import { Endpoints } from "../Endpoints.enum";
import { getNewUserFromDTO } from "./services/getNewUserFromDTO";
import { isUserDTOValid } from "./services/isUserDTOValid";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';

const canHandle: CanHandleRequest = ({ method, url }) => {
  const isGetMethod = method === RestMethods.POST;

  return isGetMethod && url.toLowerCase() === Endpoints.Users;
};

const handleRequest: HandleRequest = async (req, res) => {
  try {
    const body = await getHttpRequestBody(req);
    const bodyParsed = JSON.parse(body);
    const isValid = isUserDTOValid(bodyParsed);

    if (!isValid) {
        res.statusCode = StatusCodes.BAD_REQUEST;
        setResponseContentTypeHeader(res, ContentTypes.JSON);
        res.end(ReasonPhrases.BAD_REQUEST);

        return;
    }

    const newUser = getNewUserFromDTO(bodyParsed);
    store.createNewUser(newUser);

    res.statusCode = StatusCodes.OK;
    setResponseContentTypeHeader(res, ContentTypes.Text);
    res.end("User Created");

  } catch (error) {
    throw new InternalServerError("Internal Server Error");
  }
};

export const createUserResource: Resource = [canHandle, handleRequest];


