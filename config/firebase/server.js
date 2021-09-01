import firebaseServer from "firebase-admin"

const serviceAccount = require('../../serviceAccountKey.json')

const app = firebaseServer.apps.length 
  ? firebaseServer.app() 
  : firebaseServer.initializeApp({
    credential: firebaseServer.credential.cert(serviceAccount)
  })


export { firebaseServer }