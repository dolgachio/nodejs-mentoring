import { RepositoryGetAll, RepositoryGetSingle } from "../../types/Repository";
import { user, UserEntity } from "../../types/user.entity";

let users: UserEntity[] = [user];

async function getAll(): Promise<UserEntity[]> {
  return users;
}

async function getById(id: string): Promise<UserEntity | null> {
  return users.find((userItem) => userItem.id === id) || null;
}

type UserRepository = RepositoryGetAll<UserEntity> &
  RepositoryGetSingle<UserEntity>;
export const userRepository: UserRepository = {
  getAll,
  getById,
};
