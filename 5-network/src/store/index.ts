import { User } from "../models";

let storedUsers: User[] = [];

export function getAllUsers(): User[] {
    return storedUsers;
}

export function getUserById(id: number): User | null {
    return storedUsers.find(user => user.id === id) || null;
}
