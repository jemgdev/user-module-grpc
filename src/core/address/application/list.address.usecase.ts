import AddressModel from "../domain/address.model"
import AddressPersistanceRepository from "../domain/address.persistance.repository"

export default class ListAddressUseCase {
  constructor (private readonly addressPersistanceRepository: AddressPersistanceRepository) {}

  async list (): Promise<AddressModel[]> {
    const addresses = await this.addressPersistanceRepository.findAddresses()

    return addresses
  }
}