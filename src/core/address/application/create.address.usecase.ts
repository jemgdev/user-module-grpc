import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import AddressModel from "../domain/address.model"
import AddressPersistanceRepository from "../domain/address.persistance.repository"

export default class RegisterAddressUseCase {
  constructor (private readonly addressPersistanceRepository: AddressPersistanceRepository) {}

  async register (address: AddressModel): Promise<AddressModel> {
    const {
      city,
      country,
      postcode,
      state,
      userId
    } = address
    
    if (
      !city ||
      !country ||
      !postcode ||
      !state ||
      !userId
    ) {
      throw new BadRequestError({ message: 'Request is not valid', core: 'address' })
    }

    const addressRegistered = await this.addressPersistanceRepository.insertAddress(address)

    return addressRegistered
  }
}