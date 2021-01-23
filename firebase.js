import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDfDGcYcgqowFoUWTPEWDldRt4Mjv04Vsc",
    authDomain: "jhutasa-ad8c9.firebaseapp.com",
    databaseURL: "https://jhutasa-ad8c9-default-rtdb.firebaseio.com",
    projectId: "jhutasa-ad8c9",
    storageBucket: "jhutasa-ad8c9.appspot.com",
    messagingSenderId: "24050385300",
    appId: "1:24050385300:web:946531fe85a8c2d4804f81",
    measurementId: "G-KR0XN5NEDQ"
};
firebase.initializeApp(config);

var db = firebase.firestore();

export default db;
