import { User, UserPatch } from "../models";

interface Store {
    getAllUsers: () => User[];
    getUserById: (id: string) => User | null;
    createNewUser: (newUser: User) => void;
    deleteUser: (userId: string) => void;
    updateUser: (userId: string, userPatch: UserPatch) => boolean;
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

function updateUser(userId: string, userPatch: UserPatch): boolean {
    const user = getUserById(userId);
    let isUpdaded = false;
    if (!user) {
        return isUpdaded;
    }
    
    const { name, email } = userPatch;
    if (!!name && typeof name === "string") {
        isUpdaded = true;
        user.name = name;
    }

    if (!!email && typeof email === "string") {
        isUpdaded = true;
        user.email = email;
    }

    return isUpdaded;
}

export const store: Store = {
    getAllUsers,
    getUserById,
    createNewUser,
    deleteUser,
    updateUser,
}
