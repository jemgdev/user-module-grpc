import { NextFunction, Request, Response } from 'express'
import ResponseModel from '../utils/standar-response/response.model'
import { ResponseStatusCodes } from '../utils/standar-response/response.status.codes'
import { ResponseCodes } from '../utils/standar-response/response.codes'
import RegisterUserUseCase from '../user/application/register.user.usecase'
import UserPrismaRepository from '../user/infrastructure/user.prisma.repository'
import ListUsersUseCase from '../user/application/list.users.usecase'

const userRepository = new UserPrismaRepository()

const registerUserUseCase = new RegisterUserUseCase(userRepository)
const listUsersUseCase = new ListUsersUseCase(userRepository)

export const registerUserHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { username, age, dni, email } = request.body

  try {
    const userRegistered = await registerUserUseCase.register({ username, age, dni, email })

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'User was registered successfuly',
      data: userRegistered
    }).send(response)
  } catch (error) {
    next(error)
  }
}

export const listUsersHandler = async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const users = await listUsersUseCase.list()

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'User found',
      data: users
    }).send(response)
  } catch (error) {
    next(error)
  }
}