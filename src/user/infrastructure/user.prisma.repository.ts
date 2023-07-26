import * as grpc from '@grpc/grpc-js'
import PrismaConnection from "../../prisma/prisma.connection"
import CreateUserModel from "../domain/create.user.model"
import UserModel from "../domain/user.model"
import UserPersistanceRepository from "../domain/user.persistance.respository"
import { v4 as uuid } from 'uuid'
import grpcClient from "./client.grpc"
import UnavailableError from '../../utils/custom-errors/infrastructure-errors/unavailable.error'

const prisma = new PrismaConnection().connection

export default class UserPrismaRepository implements UserPersistanceRepository {
  async findUsers(): Promise<UserModel[]> {
    try {
      const usersFound = await prisma.user.findMany()

      return usersFound.map(user => {
        return {
          userId: user.user_id,
          username: user.user_name,
          age: user.age,
          dni: user.dni,
          email: user.email,
        }
      })
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'user' })
    }
  }

  insertItemByUserId(userId: string): void {
    const metadata = new grpc.Metadata()
    metadata.set('moduleName', 'userModule')

    const call = grpcClient.CreateItem(metadata)

    call.write({
      userId,
      message: 'Send userId'
    })

    call.on('data', (chunk) => {
      console.error(chunk)
    })

    call.on('error', (error) => {
      console.error(error.message)
    })

    call.end()
  }

  async insertUser(user: CreateUserModel): Promise<UserModel> {
    const { age, dni, email, username } = user

    try {
      const { 
        age: age_db, 
        dni: dni_db, 
        email: email_db, 
        user_id, 
        user_name 
      } = await prisma.user.create({
        data: {
          age,
          dni,
          email,
          user_id: uuid(),
          user_name: username
        }
      })
  
      this.insertItemByUserId(user_id)
  
      return {
        age: age_db,
        dni: dni_db,
        email: email_db,
        userId: user_id,
        username: user_name
      }
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'user' })
    }
    
  }
}