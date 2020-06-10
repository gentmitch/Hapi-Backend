import {isTokenValid} from '../Helpers/AuthHelpers'
import {users} from '../../server/firebase.js'


let getProfilePage = {
    method: 'GET',
    path: '/api/user/getProfilePage',
    handler: async (req, h) => {

        if(!req.cookies['AUTH']){
            res.status(404)
            res.end(JSON.stringify({error:'Unauthorized'}))
        }
    
        let userInfo = await isTokenValid(req.cookies['AUTH'])
    
        if(userInfo) {
            let user = await users.doc(userInfo.sub).get()

            if(user){
                h.
                response(user.data())
                .status(200)
            }
        }
    }
}

export default getProfilePage
