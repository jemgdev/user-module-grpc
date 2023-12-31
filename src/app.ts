import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import ResponseModel from './utils/standar-response/response.model'
import { ResponseCodes } from './utils/standar-response/response.codes'
import { ResponseStatusCodes } from './utils/standar-response/response.status.codes'
import notFound from './middlewares/notFound'
import responseError from './middlewares/responseError'
import userRouter from './routes/user.routes'
import addressRouter from './routes/address.routes'
dotenv.config()

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.set('PORT', process.env.PORT ?? 3000)

const home = async (_request: Request, response: Response): Promise<void> => {
  new ResponseModel({
    statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
    code: ResponseCodes.SUCCESS_REQUEST,
    message: 'Welcome to AgroCredito API v1.'
  }).send(response)
}

app.get('/', home)

app.use('/api/v1/users', userRouter)
app.use('/api/v1/address', addressRouter)

app.use(notFound)
app.use(responseError)

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${String(app.get('PORT'))}`)
})