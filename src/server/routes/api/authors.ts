import { Router } from 'express'
import db from '../../db';

const router = Router();


// GET /api/authors/id
router.get('/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id, 10)
        const user = await db.authors.getOneAuthor(id)
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

//GET /api/authors/
router.get('/', async (req,res) => {
    try {
        const authors = await db.authors.getALLAuthors()
        res.json(authors)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

export default router;