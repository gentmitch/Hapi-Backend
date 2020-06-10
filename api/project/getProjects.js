import {getUserInfo} from '../Helpers/AuthHelpers'
import {projects} from '../../server/firebase.js'

async function post(req, res, next) {
    
    if(req.cookies['AUTH']) 
    {
        var currentUser = await getUserInfo(req.cookies['AUTH']);
        var userid = currentUser.sub;

        let proj = await projects.doc().set({
            owner: userid,
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            startDate: new Date().getTime(),
            endDate: req.body.endDate,
            tagList: req.body.tagList,
        })

        if(proj){
            res.end(JSON.stringify('SUCCESS'))
        }
        else{
            res.end(JSON.stringify('FAILED'))
        }
    }
    else {
        res.end('NOT LOGGED IN')
    }
}

export {
    post
}