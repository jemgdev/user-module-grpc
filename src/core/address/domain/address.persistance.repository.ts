import AddressModel from "./address.model"

export default interface AddressPersistanceRepository {
  insertAddress (address: AddressModel): Promise<AddressModel>
  findAddresses (): Promise<AddressModel[]>
}