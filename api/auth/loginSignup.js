import Joi from '@hapi/joi'
import { getUserInfo } from '../Helpers/AuthHelpers'
import { createJsonWebToken, cookieConfig } from '../../server/auth.js'
import { users } from '../../server/firebase.js'

let loginSignup = {
  method: 'POST',
  path: '/api/auth/loginSignup',
  options: {
    validate: {
      payload: Joi.object({
        id_token: Joi.string().required()
      })
    }
  },
  handler: async (request, h) => {
    console.log(request.payload.id_token)
    const {id_token}  = request.payload
    const user_data = await getUserInfo(id_token)
  
    console.log(id_token)
    // console.log(user_data)
  
    if (!user_data.errors) {
      const user = await users.doc(user_data.sub).get()
  
      if (user.exists) {
        const user = await users.doc(jwt.sub).get()
        const jwt = await createJsonWebToken(user)
  
        h.response()
          .state('AUTH', jwt, cookieConfig)
          .code(201)
  
        return {
          profile: user_data,
          authenticated: true
        }
      } 
      else {
        createNewUser(user_data)
      }
  
      return h.response().code(401)
    }
  }
}

async function createNewUser(user_data) {
  let new_user
  new_user = {
    firstName: user_data.given_name,
    lastName: user_data.family_name,
    email: user_data.email,
    complete: false,
    joined: Date.now(),
    status: false,
    picture: user_data.picture
  }

  const doc = await users.doc(user_data.sub).set(new_user)
  const jwt = await createJsonWebToken(new_user)

  h.response()
    .state('AUTH', jwt, cookieConfig)
    .code(201)

  return {
    profile: user_data,
    authenticated: true
  }
}

export default loginSignup