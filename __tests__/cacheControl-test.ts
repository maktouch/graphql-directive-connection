import { getConnectionSchema } from './utils'

test('cacheControl test', () => {
  const typeDefs = `
    directive @sql on FIELD_DEFINITION
    directive @cacheControl (
      maxAge: Int
      scope: CacheControlScope
    ) on FIELD_DEFINITION | OBJECT | INTERFACE
    enum CacheControlScope {
      PUBLIC
      PRIVATE
    }

    type User {
      userId: Int
      shortPosts: [Post] @connection @cacheControl(maxAge: 10)
      longPosts: [Post] @connection @cacheControl(maxAge: 0)
    }

    type Post @cacheControl(maxAge: 20) {
      postId: Int
    }

    type Query {
      user: User
    }
  `

  expect(getConnectionSchema(typeDefs)).toMatchInlineSnapshot(`
    "schema {
      query: Query
    }

    directive @connection on FIELD_DEFINITION

    directive @sql on FIELD_DEFINITION

    directive @cacheControl(maxAge: Int, scope: CacheControlScope) on FIELD_DEFINITION | OBJECT | INTERFACE

    type PageInfo {
      hasNextPage: Boolean!
      hasPreviousPage: Boolean!
      startCursor: String
      endCursor: String
    }

    type PostEdge @cacheControl(maxAge: 10) {
      cursor: String!
      node: Post
    }

    type PostConnection {
      totalCount: Int!
      edges: [PostEdge] @cacheControl(maxAge: 10)
      pageInfo: PageInfo! @cacheControl(maxAge: 10)
    }

    enum CacheControlScope {
      PUBLIC
      PRIVATE
    }

    type User {
      userId: Int
      shortPosts(after: String, first: Int, before: String, last: Int): PostConnection @cacheControl(maxAge: 10)
      longPosts(after: String, first: Int, before: String, last: Int): PostConnection @cacheControl(maxAge: 0)
    }

    type Post @cacheControl(maxAge: 20) {
      postId: Int
    }

    type Query {
      user: User
    }
    "
  `)
})
