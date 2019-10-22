/*import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBpp6jZFXE9KAOcooxe_eVD6w0tACGRn-s',
  authDomain: 'basuimpact-2e9d1.firebaseapp.com',
  databaseURL: 'https://basuimpact-2e9d1.firebaseio.com',
  projectId: 'basuimpact-2e9d1',
  storageBucket: 'basuimpact-2e9d1.appspot.com',
  messagingSenderId: '351730788251',
  appId: '1:351730788251:web:43b54833a78798ff'
}

let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(config)
}

//export const db = app.database()
*/

import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
    const config = {
  apiKey: 'AIzaSyBpp6jZFXE9KAOcooxe_eVD6w0tACGRn-s',
  authDomain: 'basuimpact-2e9d1.firebaseapp.com',
  databaseURL: 'https://basuimpact-2e9d1.firebaseio.com',
  projectId: 'basuimpact-2e9d1',
  storageBucket: 'basuimpact-2e9d1.appspot.com',
  messagingSenderId: '351730788251',
  appId: '1:351730788251:web:43b54833a78798ff'
    }
    firebase.initializeApp(config)
    firebase.firestore().settings({timestampsInSnapshots: true})
}
const fireDb = firebase.firestore()
export {fireDb}