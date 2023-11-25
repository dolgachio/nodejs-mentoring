import { Resource } from "../../../models/Resource.model";
import { createUserResource } from "./createUser.controller";
import { deleteUserResource } from "./deleteUser.controller";
import { getAllUsersResource } from "./getAllUsers.controller";
import { getUserResource } from "./getUser.controller";
import { updateUserResource } from "./updateUser.controller";

export const usersResources: Resource[] = [
  getAllUsersResource,
  getUserResource,
  createUserResource,
  deleteUserResource,
  updateUserResource,
];
