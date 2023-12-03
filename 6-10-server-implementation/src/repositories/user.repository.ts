import { RepositoryBase } from "../types/Repository"
import { UserEntity, user } from "../types/user.entity";

let users: UserEntity[] = [user];

async function all(): Promise<UserEntity[]> {
    return users;
}

async function getById(id: string): Promise<UserEntity | null> {
    return users.find(userItem => userItem.id === id) || null;
}

export const userRepository: RepositoryBase<UserEntity> = {
    all,
    getById,
}