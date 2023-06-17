import express = require("express")
import router from "./Path"

const mainRouter = express.Router()
mainRouter.use('/api', router)
mainRouter.use('/web',router)
export default mainRouter