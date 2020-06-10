'use strict'

// import {complete} from './api/user/complete.js'
// import loginSignup from './api/auth/loginSignup'
// import getProfilePage from './api/project/getProfilePage'
import getDummyProject from './api/project/getDummyProject'

export let routes = [
  getDummyProject,

  // {
  //   method: 'PUT',
  //   path: '/api/user/complete',
  //   handler: (request, h) => complete(request, h)
  // }
]
