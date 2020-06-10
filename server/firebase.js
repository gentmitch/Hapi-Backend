import * as admin from 'firebase-admin';
import serviceAccount from '../resources/serviceAccounts.js'
let storageBucket = process.env.NODE_ENV === 'production' ? '' : 'gs://jointcreative1-dev.appspot.com'

let app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.NODE_ENV === 'production' ? "https://jointcreative1.firebaseio.com" : "https://jointcreative1-dev.firebaseio.com"
});


const auth = admin.auth()
const db = admin.firestore()
const users = db.collection('users')
const projects = db.collection('projects')
const storage = admin.storage().bucket(storageBucket)

export {
  auth,
  db,
  users,
  projects,
  storage
}