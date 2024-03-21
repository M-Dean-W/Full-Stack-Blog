import { SelectQuery } from "../queryUtils";
import type { RowDataPacket } from "mysql2";

export interface IAuthorsRow extends RowDataPacket {
    id:number;
    handle:string;
    email:string;
    created_at:Date;
}

export function getALLAuthors() {
    return SelectQuery<IAuthorsRow>('SELECT * FROM authors;')
}

export function getOneAuthor(id:number) {
    return SelectQuery<IAuthorsRow>('SELECT * FROM authors WHERE id = ?;', [id])
}
