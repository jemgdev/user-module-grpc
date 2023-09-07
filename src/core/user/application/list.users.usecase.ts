import UserModel from "../domain/user.model"
import UserPersistanceRepository from "../domain/user.persistance.respository"

export default class ListUsersUseCase {
  constructor (private readonly userPersistanceRepository: UserPersistanceRepository) {}

  async list (): Promise<UserModel[]> {
    const users = await this.userPersistanceRepository.findUsers()

    return users
  }
}