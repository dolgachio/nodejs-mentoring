export interface UserPatch {
    name?: unknown;
    email?: unknown;
}

export interface UserCore {
  id: string;
  name: string;
  email: string;
}

export interface User extends UserCore {
  hobbies: string[];
}

export interface UserDTO {
  name: string;
  email: string;
  hobbies?: string[];
}
