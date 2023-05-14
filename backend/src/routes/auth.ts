import express from 'express'

const authRouter = express.Router()

authRouter.get('/hello', (req, res) => res.send('hello world'))

export default authRouter