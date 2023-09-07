import { Router } from 'express'
import { listAddressHandler, registerAddresHandler } from '../controller/address.controller'
const addressRouter = Router()

addressRouter.post('/:userId', registerAddresHandler)
addressRouter.get('/', listAddressHandler)

export default addressRouter