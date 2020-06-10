import Joi from '@hapi/joi'

let loginSignup = {
  method: 'POST',
  path: '/api/auth/loginSignup',
  options: {
    validate: {
      payload: Joi.object({
        data: Joi.string().required()
      })
    }
  },
  handler: async (request, h) => {
        const {data}  = request.payload
        return data
  }
}
