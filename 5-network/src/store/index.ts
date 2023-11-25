import { User } from "../models";

interface Store {
    getAllUsers: () => User[];
    getUserById: (id: string) => User | null;
    createNewUser: (newUser: User) => void;
    deleteUser: (userId: string) => void;
}

let storedUsers: User[] = [];

function getAllUsers(): User[] {
    return storedUsers;
}

function getUserById(id: string): User | null {
    return storedUsers.find(user => user.id === id) || null;
}

function createNewUser(newUser: User): void {
    storedUsers.push(newUser);
}

function deleteUser(userId: string): void {
    storedUsers = storedUsers.filter((user) => user.id === userId);
}

export const store: Store = {
    getAllUsers,
    getUserById,
    createNewUser,
    deleteUser,
}
