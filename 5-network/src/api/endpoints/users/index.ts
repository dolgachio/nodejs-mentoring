import { Resource } from "../../../models/Resource.model";
import { createUserResource } from "./createUser.controller";
import { deleteUserResource } from "./deleteUser.controller";
import { getUsersResource } from "./getUsers.controller";

export const usersResources: Resource[] = [
  getUsersResource,
  createUserResource,
  deleteUserResource,
];
