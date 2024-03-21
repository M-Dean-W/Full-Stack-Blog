import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { RowDataPacket } from "mysql2";

export interface IBlogsRow extends RowDataPacket {
    id:number;
    author_id:number;
    body:string;
    location:string;
    created_at:Date;
}

export function getALLBlogs() {
    return SelectQuery<IBlogsRow>('SELECT authors.full_name, blogs.* FROM blogs JOIN authors ON blogs.author_id = authors.id;')
}

export function getOneBlog(id:number) {
    return SelectQuery<IBlogsRow>('SELECT authors.full_name, blogs.* FROM blogs JOIN authors ON blogs.author_id = authors.id WHERE blogs.id = ?;', [id])
}

export function insertBlog(author_id:number, content:string, title:string) {
    return ModifyQuery('INSERT INTO blogs (author_id, content, title) VALUE (?, ?, ?);', [author_id, content, title])
}

export function updateBlog(author_id:number, content:string, title:string, id:number) {
    return ModifyQuery('UPDATE blogs SET author_id = ?, content = ?, title = ? WHERE id = ?;', [author_id, content, title, id])
}

export function deleteBlog(id:number) {
    return ModifyQuery('DELETE FROM blogs WHERE id = ?;', [id])
}

export function getBlog_tags(author_id:number) {
    return SelectQuery<IBlogsRow>('SELECT b.*, a.full_name FROM blogs b JOIN authors a ON a.author_id = a.id JOIN blog_tags t ON t.blog_id = b.id  WHERE t.author_id = ?', [author_id])
}