import { NextFunction, Request, Response } from 'express'
import ResponseModel from '../utils/standar-response/response.model'
import { ResponseStatusCodes } from '../utils/standar-response/response.status.codes'
import { ResponseCodes } from '../utils/standar-response/response.codes'
import CreateAddressUseCase from '../core/address/application/create.address.usecase'
import ListAddressUseCase from '../core/address/application/list.address.usecase'
import AddressCassandraRepository from '../core/address/infrastructure/address.cassandra.repository'

const addressCassandraRepository = new AddressCassandraRepository()

const registerUserUseCase = new CreateAddressUseCase(addressCassandraRepository)
const listAddressUseCase = new ListAddressUseCase(addressCassandraRepository)

export const registerAddresHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { userId } = request.params
  const { city, country, postcode, state } = request.body

  try {
    const addressRegistered = await registerUserUseCase.register({ city, country, postcode, state, userId })

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'Address was registered successfuly',
      data: addressRegistered
    }).send(response)
  } catch (error) {
    next(error)
  }
}

export const listAddressHandler = async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const addresses = await listAddressUseCase.list()

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'Addresses found',
      data: addresses
    }).send(response)
  } catch (error) {
    next(error)
  }
}