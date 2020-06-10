'use strict'
import Hapi from '@hapi/hapi'

import {strategy} from './auth.js'
import {routes} from '../routes.js'
import plugin from 'hapi-auth-jwt2'

const host = process.env.NODE_ENV === 'production' ? '0.0.0.0':'localhost'

let server
const init = async() => {
    server = Hapi.server({
        routes:{
            cors:{
                credentials: true
            }
        },
        port: 8080,
        host: 'localhost'
    })

    await server.register(plugin)
    
    const {type, name, config} = strategy

    server.auth.strategy(type, name, config)

    await server.route(routes)

    await server.start()
    console.log(`Server running on ${server.info.uri}`)
}

init()

export default server