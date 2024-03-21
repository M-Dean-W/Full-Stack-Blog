import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { RowDataPacket } from "mysql2";

export interface IBlog_tagsRow extends RowDataPacket {
    blog_id:number;
    tag_id:number;
}

export function getALLBlog_tags() {
    return SelectQuery<IBlog_tagsRow>('SELECT * FROM blog_tags;')
}

export function insertBlog_tag(blog_id:number, tag_id:number) {
    return ModifyQuery('INSERT INTO blog_tags (blog_id, tag_id) VALUES (?,?);', [blog_id, tag_id])
}

export function deleteForBlog(blog_id: number) {
    return ModifyQuery("DELETE FROM blog_tags WHERE blog_id = ? ", [blog_id]);
}