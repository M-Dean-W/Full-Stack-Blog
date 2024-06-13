import { Router } from 'express'
import blogsRouter from './blogs'
import authorsRouter from './authors'
import emailRouter from './email'
import donateRouter from './donate'
import loginRouter from './login'
import registerRouter from './register'

const router = Router()

router.use('/blogs', blogsRouter)
router.use('/authors', authorsRouter)
router.use('/email', emailRouter)
router.use('/donate', donateRouter)
router.use('/login', loginRouter )
router.use('/register', registerRouter)

export default router;