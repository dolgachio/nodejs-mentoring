import { RestMethods } from "../../../constants/RestMethods";
import { User } from "../../../models";
import { DefaultDTO } from "../../../models/DefaultDTO";
import {
  Resource,
  HandleRequest,
  CanHandleRequest,
} from "../../../models/Resource";
import { store } from "../../../store";
import { Endpoints } from "../Endpoints.enum";

const isGetUsers: CanHandleRequest = ({ method, url }) => {
  const isGetMethod = method === RestMethods.GET;
  
  return isGetMethod && url.toLowerCase() === Endpoints.Users;
};

const applyGetUsers: HandleRequest = (_, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/JSON");
    
    const responseData: DefaultDTO<User[]> = { data: store.getAllUsers() };
    
    res.end(JSON.stringify(responseData));
};

export const getUsersResource: Resource = [isGetUsers, applyGetUsers];
