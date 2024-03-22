import db from "../db";

async function insertBlog_tags(content: string, blog_id: number) {
    const blog_tagPattern = /#\w+/g;
    const Tags = content.match(blog_tagPattern);

    if (Tags) {
        const tags = await db.tags.getALLTags();

        await db.blog_tags.deleteForBlog(blog_id);

        for await (const singleTag of Tags) {
            const foundTag = tags.find((u) => u.handle!.toLowerCase() === singleTag.replace("#", "").toLowerCase());

            if (foundTag) {
                await db.blog_tags.insertBlog_tag(blog_id, foundTag.id!);
            }
        }
    }
}

export default insertBlog_tags;