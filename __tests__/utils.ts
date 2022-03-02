import { makeExecutableSchema } from '@graphql-tools/schema'
import { printSchemaWithDirectives } from '@graphql-tools/utils'
import connectionDirective from '../src'

const { connectionDirectiveTypeDefs, connectionDirectiveTransform } =
  connectionDirective('connection', { useCacheControl: true })

export const getConnectionSchema = (typeDefs: string) => {
  let schema = makeExecutableSchema({
    typeDefs: [connectionDirectiveTypeDefs, typeDefs],
  })
  schema = connectionDirectiveTransform(schema)
  return printSchemaWithDirectives(schema)
}

test('placeholder', () => {
  expect(true).toBe(true)
})
