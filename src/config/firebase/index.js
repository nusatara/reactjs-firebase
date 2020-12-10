import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBIfR5nswHNGsULajojdysHAbIolc2t8Lo",
    authDomain: "simple-notes-firebase-8a63d.firebaseapp.com",
    databaseURL: "https://simple-notes-firebase-8a63d.firebaseio.com",
    projectId: "simple-notes-firebase-8a63d",
    storageBucket: "simple-notes-firebase-8a63d.appspot.com",
    messagingSenderId: "131612460837",
    appId: "1:131612460837:web:2e82cc6fc6e2a37a9f7ccc",
    measurementId: "G-94GSQNK21H"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const database = firebase.database(); 
  export default firebase;