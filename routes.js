'use strict'

import {complete} from './api/user/complete.js'
import loginSignup from './api/auth/loginSignup'
import getProfilePage from './api/user/getProfilePage'

export let routes = [
  // loginSignUpEM,
  getProfilePage,
  loginSignup,
  // logout,

  {
    method: 'PUT',
    path: '/api/user/complete',
    handler: (request, h) => complete(request, h)
  }
]
