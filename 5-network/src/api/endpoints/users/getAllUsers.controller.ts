import { ContentTypes } from "../../../constants/ContentTypes";
import { RestMethods } from "../../../constants/RestMethods";
import { User } from "../../../models";
import { DefaultDTO } from "../../../models/DefaultDTO";
import {
  Resource,
  HandleRequest,
  CanHandleRequest,
} from "../../../models/Resource.model";
import { store } from "../../../store";
import { setResponseContentTypeHeader } from "../../../utils/setResponseContentTypeHeader";
import { Endpoints } from "../Endpoints.enum";
import {
	StatusCodes,
} from 'http-status-codes';

// Endpoint
// GET: /users
const isGetUsers: CanHandleRequest = ({ method, url }) => {
  const isGetMethod = method === RestMethods.GET;
  
  return isGetMethod && url.toLowerCase() === Endpoints.Users;
};

const applyGetUsers: HandleRequest = (_, res) => {
    res.statusCode = StatusCodes.OK;
    setResponseContentTypeHeader(res, ContentTypes.JSON);
    
    const responseData: DefaultDTO<User[]> = { data: store.getAllUsers() };
    
    res.end(JSON.stringify(responseData));
};

export const getAllUsersResource: Resource = [isGetUsers, applyGetUsers];
