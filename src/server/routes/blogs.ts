import { Router } from 'express'
import db from '../db';
import insertBlog_tags from '../services/insertBlog_tags';

const router = Router();

//GET /api/blogs/latest
router.get('/latest', async (req,res) => {
    try {
        const blogs = await db.blogs.getLatestBlogs()
        res.json(blogs)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

// GET /api/blogs/id
router.get('/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id, 10)
        const blog = await db.blogs.getOneBlog(id)
        const muchBetterBlog = blog.map((blog) => {
            const tags = blog.tagsID ? blog.tagsID.split(',').map((tid:number, index:number) => ({ id: tid, name: blog.TagNames.split(',')[index] })) : []  
            delete blog.tagsID;
            delete blog.TagNames;
            return { ...blog, tags }
          });
        res.json(muchBetterBlog)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});



//GET /api/blogs/
router.get('/', async (req,res) => {
    try {
        const offset = req.query.offset
        const blogs = await db.blogs.getALLBlogs(Number(offset))
        const [aggregated] = await db.blogs.blogsCount()
        res.json({ blogs, count: aggregated.count})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

//POST /api/blogs/
router.post('/', async (req,res) => {
    try {
        const { author_id, content, title } = req.body
        const blogResult = await db.blogs.insertBlog(author_id, content, title || '')
        await insertBlog_tags(content, blogResult.insertId)
        res.json({ message:'blog created', id:blogResult.insertId})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

// PUT /api/blogs/id
router.put("/:id", async (req, res) => {
    try {
        const { author_id, content, title } = req.body;
        const id = Number(req.params.id);
        await db.blogs.updateBlog(author_id, content, title, id);
        await insertBlog_tags(content,id)
        res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// DELETE /api/blogs/id
router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await db.blog_tags.deleteForBlog(id)
        await db.blogs.deleteBlog(id);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export default router;