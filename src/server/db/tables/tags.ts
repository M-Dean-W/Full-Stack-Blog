import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { RowDataPacket } from "mysql2";

export interface ITagsRow extends RowDataPacket {
    tag_name:string;
}

export function getALLTags() {
    return SelectQuery<ITagsRow>('SELECT * FROM tags;')
}

export function insertTag(tag_name:string) {
    return ModifyQuery('INSERT INTO tags (tag_name) VALUES (?);', [tag_name])
}

export function deleteTag(tag_name:string) {
    return ModifyQuery("DELETE FROM tags WHERE tag_name = ? ", [tag_name]);
}