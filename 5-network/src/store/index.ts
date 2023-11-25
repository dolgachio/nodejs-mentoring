import { User } from "../models";

interface Store {
    getAllUsers: () => User[];
    getUserById: (id: number) => User | null;
}

let storedUsers: User[] = [];

function getAllUsers(): User[] {
    return storedUsers;
}

function getUserById(id: number): User | null {
    return storedUsers.find(user => user.id === id) || null;
}

export const store: Store = {
    getAllUsers,
    getUserById,
}
