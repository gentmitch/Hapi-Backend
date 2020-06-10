export async function post(req, res, next) {
    if(req.cookies['AUTH']){
        res.clearCookie('AUTH')
    }
    res.end(JSON.stringify('You should be signed out'))
}