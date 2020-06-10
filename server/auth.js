  
'use strict'

import { promisify } from 'util'
import jwt from 'jsonwebtoken'

const sign = promisify(jwt.sign)
const seed = 'some-totally-secret-string'


export let strategy = {
  type: 'jwt',
  name: 'jwt',
  config: {
    cookieKey: 'AUTH',
    validate: ({ id, role, scp }) => ({
      isValid: true,
      credentials: {
        id,
        role,
        scope: scp
      }
    }),
    verifyOptions: {
      algorithms: [ 'HS256' ]
    }
  }
}

export async function createJsonWebToken (user) {
  const { email, scope, firstName, lastName, picture } = user
  const exp = new Date()
  exp.setDate(exp.getDate() + 1)
  return sign({ email, scope, firstName, lastName, picture, exp: exp.getTime() }, seed)
}

export let cookieConfig = {
  encoding: 'none',
  isHttpOnly: true,
  ttl: 1000 * 60 * 60 * 24 * 3,
  isSecure: false,
  isSameSite: false,
  domain: 'localhost',
  path: '/'
}