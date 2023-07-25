import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../../proto/creation'

const PORT = 8080

const PROTO_FILE = '../../proto/creation.proto'
const packageOf = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))

const grpcObject = (grpc.loadPackageDefinition(packageOf) as unknown) as ProtoGrpcType

const grpcClient = new grpcObject.creationPackage.Creation(
  `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
)

const deadLine = new Date()
deadLine.setSeconds(deadLine.getSeconds() + 5)

grpcClient.waitForReady(deadLine, (error) => {
  if (error) {
    console.error(error)
    return
  }
})

export default grpcClient