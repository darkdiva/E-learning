import express from 'express'
import adminRouter from './api/admin'
import accountRouter from './api/account'
import Authrouters from './api/auth'

const router = express.Router()

router.use('/auth', Authrouters)
router.use('/admin',adminRouter)
router.use('/account',accountRouter)

const mainRouter = express.Router()
mainRouter.use('/api', router)
export default mainRouter