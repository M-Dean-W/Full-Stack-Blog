import { RowDataPacket } from "mysql2";
import { SelectQuery, ModifyQuery } from "../queryUtils";

export interface IUsersRow extends RowDataPacket {
    id:number;
    email:string;
    created_at:number;
}

export function findUser(column:string, value:string) {
    return SelectQuery<IUsersRow>('SELECT * FROM Users WHERE ?? = ?', [column, value])
}

export function addUser(newUser: { email:string, password: string}) {
    return ModifyQuery('INSERT INTO Users SET ?', newUser)
}