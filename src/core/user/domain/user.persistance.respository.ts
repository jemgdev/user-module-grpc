import UserModel from "./user.model"
import CreateUserModel from './create.user.model'

export default interface UserPersistanceRepository {
  insertUser (user: CreateUserModel): Promise<UserModel>
  findUsers (): Promise<UserModel[]>
  insertItemByUserId (userId: string): void
}