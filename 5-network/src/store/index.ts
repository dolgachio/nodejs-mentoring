import { User, UserPatch } from "../models";

interface Store {
    getAllUsers: () => User[];
    getUserById: (id: string) => User | null;
    createNewUser: (newUser: User) => void;
    deleteUser: (userId: string) => void;
    updateUser: (userId: string, userPatch: UserPatch) => boolean;
    addUserHobby: (userId: string, newHobby: unknown) => boolean;
    deleteUserHobby: (userId: string, hobby: unknown) => boolean;
    getUserHobbies: (userId: string) => string[] | null;
}

let storedUsers: User[] = [
    {
        "id": "6791d1ef-720e-463e-b77f-20ed7ed3479f",
        "name": "User1",
        "email": "dsad",
        "hobbies": []
    }
];

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
    let isUpdated = false;
    if (!user) {
        return isUpdated;
    }
    
    const { name, email } = userPatch;
    if (!!name && typeof name === "string") {
        isUpdated = true;
        user.name = name;
    }

    if (!!email && typeof email === "string") {
        isUpdated = true;
        user.email = email;
    }

    return isUpdated;
}

function addUserHobby(userId: string, newHobby: unknown): boolean {
    const user = getUserById(userId);
    let isUpdated = false;
    if (!user) {
        return isUpdated;
    }

    if (!!newHobby && typeof newHobby === "string" && !user.hobbies.includes(newHobby)) {
        isUpdated = true;
        
        user.hobbies.push(newHobby);
    }

    return isUpdated;
}

function deleteUserHobby(userId: string, hobbyToDelete: unknown): boolean {
    const user = getUserById(userId);
    let isUpdated = false;
    if (!user) {
        return isUpdated;
    }

    if (!!hobbyToDelete && typeof hobbyToDelete === "string" && user.hobbies.includes(hobbyToDelete)) {
        isUpdated = true;
        
        user.hobbies.filter((hobby) => hobby !== hobbyToDelete);
    }

    return isUpdated;
}

function getUserHobbies(userId: string): string[] | null {
    const user = getUserById(userId);
    if (!user) {
        return null;
    }

    return user.hobbies;
}

export const store: Store = {
    getAllUsers,
    getUserById,
    createNewUser,
    deleteUser,
    updateUser,
    addUserHobby,
    deleteUserHobby,
    getUserHobbies,
}
