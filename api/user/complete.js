import {getUserInfo} from '../Helpers/AuthHelpers.js'
import {users} from  '../../server/firebase.js'
import jwt from 'jsonwebtoken'

export async function complete (req, h) {
    let userInfo = jwt.decode(req.cookies['AUTH'])

    try{
        if(userInfo){
            let doc = await users.doc(userInfo.sub).set(req.body, {merge:true})

            if(doc._writeTime){
                h.code(200)
            }
            else{
                h.code(500)
                return {error: 'We\'re not perfect, something went wrong, but we\'re fixing it right now'}
            }
        }
    }
    catch(err){
        return {error: 'We\'re not perfect something went wrong, but we\'re fixing it right now'}
    }
}