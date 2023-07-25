import { Router } from 'express'
import { listUsersHandler, registerUserHandler } from '../controller/user.controller'
const userRouter = Router()

userRouter.post('/', registerUserHandler)
userRouter.get('/', listUsersHandler)

export default userRouter