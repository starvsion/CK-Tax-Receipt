// /plugins/firebase.js
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCWXJRG6Fty6bV3lBpCbDSvL3dxid3dZz4",
    authDomain: "ck-cms.firebaseapp.com",
    databaseURL: "https://ck-cms.firebaseio.com",
    projectId: "ck-cms",
    storageBucket: "",
    messagingSenderId: "339121357598",
    appId: "1:339121357598:web:a61dbd7ee0ada9edd1ff0f",
    measurementId: "G-FN9LQRSWTQ",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : "";
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const DB = firebase.database();
export const StoreDB = firebase.firestore();
export default firebase;
