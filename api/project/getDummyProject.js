import Joi from '@hapi/joi'

let getDummyProject = {
  method: 'POST',
  path: '/api/project/getDummyProject',
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

export default getDummyProject