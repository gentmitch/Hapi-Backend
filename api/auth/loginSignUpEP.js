import { createJsonWebToken, cookieConfig } from '../server/auth.js'

export default loginSignupEP = {
    method: 'POST',
    path: '/api/session',
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required()
        })
      }
    },
    handler: async (request, h) => {
      const { email, password, confirmedPassword } = request.payload
      const user = usersDatabase.find(u => u.email === email)
      
      if (password === confirmedPassword) {
        const jwt = await createJsonWebToken(user)
        return h
          .response()
          .state('my-jwt', jwt, cookieConfig)
          .code(201)
      }

      return h.response().code(401)
    }
  }