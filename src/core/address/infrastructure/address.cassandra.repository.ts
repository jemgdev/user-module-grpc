import AddressModel from "../domain/address.model"
import AddressPersistanceRepository from "../domain/address.persistance.repository"
import { cassandraClient } from "./client.cassandra"

export default class AddressCassandraRepository implements AddressPersistanceRepository {
  async insertAddress(address: AddressModel): Promise<AddressModel> {
    const query = 'INSERT INTO address (user_id, city, country, postcode, state) VALUES (?,?,?,?,?);'
    const resutlSet = await cassandraClient.execute(query, [
      address.userId,
      address.city,
      address.country,
      address.postcode,
      address.state
    ])

    console.log(resutlSet)

    return address
  }

  async findAddresses(): Promise<AddressModel[]> {
    const query = 'SELECT * FROM address;'
    const resultSet = await cassandraClient.execute(query)

    console.log(resultSet)

    return resultSet.rows.map(row => {
      return {
        city: row.city,
        country: row.country,
        postcode: row.postcode,
        state: row.state,
        userId: row.userId
      }
    })
  }
}