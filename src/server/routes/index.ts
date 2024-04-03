import { Router } from 'express'
import blogsRouter from './blogs'
import authorsRouter from './authors'
import emailRouter from './email'

const router = Router()

router.use('/blogs', blogsRouter)
router.use('/authors', authorsRouter)
router.use('/email', emailRouter)

export default router;