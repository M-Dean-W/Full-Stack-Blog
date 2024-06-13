export interface User {
    id: number;
    email: string;
    password: string;
    created_at: Date;
}

export interface Payload {
    id: User["id"];
    email: User["email"];
}

declare global {
    namespace Express {
        export interface Request {
            user: Payload;
        }
    }
}