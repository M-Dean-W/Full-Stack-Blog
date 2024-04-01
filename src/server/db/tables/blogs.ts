import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { RowDataPacket } from "mysql2";

export interface IBlogsRow extends RowDataPacket {
    id:number;
    author_id:number;
    body:string;
    location:string;
    created_at:Date;
}

export function getLatestBlogs () {
    return SelectQuery<IBlogsRow>('SELECT authors.full_name, blogs.* FROM blogs JOIN authors ON blogs.author_id = authors.id ORDER BY id DESC LIMIT 5;')
}

export function getALLBlogs(offset:number) {
    return SelectQuery<IBlogsRow>('SELECT authors.full_name, blogs.* FROM blogs JOIN authors ON blogs.author_id = authors.id ORDER BY id DESC LIMIT 10 OFFSET ?;', [offset])
}

export function blogsCount () {
    return SelectQuery<{ count:number }>('SELECT COUNT (*) as count FROM blogs;')
}

export function getOneBlog(id:number) {
    return SelectQuery<IBlogsRow>('SELECT blogs.*, GROUP_CONCAT(tags.id) as tagsID, GROUP_CONCAT(tags.tag_name) as TagNames, authors.full_name FROM blogs LEFT JOIN authors ON blogs.author_id = authors.id LEFT JOIN blog_tags ON blog_tags.blog_id = blogs.id LEFT JOIN tags ON blog_tags.tag_id = tags.id WHERE blogs.id = ? GROUP BY blogs.id;', [id])
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

export function getBlog_tags(id:number) {
    return SelectQuery<IBlogsRow>('SELECT blogs.*, tags.tag_name FROM blogs JOIN blog_tags ON blog_tags.blog_id = blogs.id JOIN tags ON blog_tags.tag_id = tags.id WHERE blogs.id = ?;', [id])
}