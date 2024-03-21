import db from "../db";

async function insertBlog_tags(body: string, blog_id: number) {
    const blog_tagPattern = /#\w+/g;
    const blog_tagedAuthors = body.match(blog_tagPattern);

    if (blog_tagedAuthors) {
        const authors = await db.authors.getALLAuthors();

        await db.blog_tags.deleteForBlog(blog_id);

        for await (const authorBlog_tag of blog_tagedAuthors) {
            const foundAuthor = authors.find((u) => u.handle!.toLowerCase() === authorBlog_tag.replace("#", "").toLowerCase());

            if (foundAuthor) {
                await db.blog_tags.insertBlog_tag(blog_id, foundAuthor.id!);
            }
        }
    }
}

export default insertBlog_tags;