const {OAuth2Client} = require('google-auth-library');
import {clientID} from './googleOAuthClientID.js'
const client = new OAuth2Client(clientID);
const issuers = ['https://cloud.google.com/iap'];



async function getBasicUserInfo(id_token) {
    try {
        const payload = await isTokenValid(id_token)
        if (payload) {
            return {
                firstName: payload.given_name,
                lastName: payload.family_name,
                email: payload.email,
                picture: payload.picture
            }
        }
    } catch (err) {
        return err
    }
}

async function getUserInfo(id_token) {
    try {
        const payload = await isTokenValid(id_token)

        if (payload) {
            return payload
        }
    } catch (err) {
        return err
    }
}

async function isTokenValid(id_token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            aud: clientID,
            issuers
        });

        if (ticket.payload.aud === clientID) {
            return ticket.payload
        } else {
            return false
        }
    } catch (err) {
        return err
    }
}

export {
    getBasicUserInfo,
    getUserInfo,
    isTokenValid
}