import express from 'express'
import authRouter from './auth'
import adminRouter from './admin'
import accountRouter from './account'


const router = express.Router()

router.use('/auth', authRouter)
router.use('/admin',adminRouter)
router.use('/account',accountRouter)
export default router


