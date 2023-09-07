import cassandra from 'cassandra-driver'

export const cassandraClient = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'address'
})