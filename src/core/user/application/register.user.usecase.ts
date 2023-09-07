import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import CreateUserModel from "../domain/create.user.model"
import UserModel from "../domain/user.model"
import UserPersistanceRepository from "../domain/user.persistance.respository"

export default class RegisterUserUseCase {
  constructor (private readonly userPersistanceRepository: UserPersistanceRepository) {}

  async register (user: CreateUserModel): Promise<UserModel> {
    const {
      age,
      dni,
      email,
      username
    } = user
    
    if (
      !age ||
      !dni ||
      !email ||
      !username
    ) {
      throw new BadRequestError({ message: 'Request is not valid', core: 'user' })
    }

    const userRegistered = await this.userPersistanceRepository.insertUser(user)

    return userRegistered
  }
}