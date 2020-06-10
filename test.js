import { expect } from  '@hapi/code'
 
import server from './server/server.js'

 describe('POST /api/auth/loginSignup', () => {
    context('Valid credentials', () => {
      let res
      
      beforeEach(async () => {
        res = await server.inject({
          method: 'post',
          url: '/api/auth/loginSignup',
          payload: {
              id_token: 'some-token'
          }
        })
      })

      afterEach(async () => {
        // some cleanup if you want
      })

      it('responds with 202 ACCEPTED', () => {
        expect(res.statusCode).to.equal(202)
      })
    })

    context('Invalid payload', () => {
      let res

      beforeEach(async () => {
        res = await server.inject({
          method: 'post',
          url: '/api/auth/loginSignup',
          payload: {} // note missing id_token
        })
      })

      it('responds with 400', () => {
        expect(res.statusCode).to.equal(400)
      })
    })
  })