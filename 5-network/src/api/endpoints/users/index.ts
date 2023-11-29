import { Resource } from "../../../models/Resource.model";
import { addUserHobbyResource } from "./addUserHobby.controller";
import { createUserResource } from "./createUser.controller";
import { deleteUserResource } from "./deleteUser.controller";
import { deleteUserHobbyResource } from "./deleteUserHobby.controller";
import { getAllUsersResource } from "./getAllUsers.controller";
import { getUserResource } from "./getUser.controller";
import { getUserHobbiesResource } from "./getUserHobbies.controller";
import { updateUserResource } from "./updateUser.controller";

export const usersResources: Resource[] = [
  getAllUsersResource,
  getUserResource,
  createUserResource,
  deleteUserResource,
  updateUserResource,
  addUserHobbyResource,
  deleteUserHobbyResource,
  getUserHobbiesResource,
];
