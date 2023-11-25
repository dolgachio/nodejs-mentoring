import { User, UserDTO } from "../../../../models";
import { v4 as uuidv4 } from "uuid";

export function getNewUserFromDTO(userData: UserDTO): User {
  return {
    id: uuidv4(),
    name: userData.name,
    email: userData.email,
    hobbies: userData.hobbies || [],
  };
}
