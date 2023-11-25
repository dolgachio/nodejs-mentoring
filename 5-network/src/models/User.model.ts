export interface User {
    id: string;
    name: string;
    email: string;
    hobbies: string[];
}

export interface UserDTO {
    name: string;
    email: string;
    hobbies?: string[];
}