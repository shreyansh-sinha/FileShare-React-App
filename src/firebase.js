import firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB96K6TfaeECU5c8VonIVO2gsiJwyYWMio",
    authDomain: "fileshare-web-app.firebaseapp.com",
    databaseURL: "https://fileshare-web-app-default-rtdb.firebaseio.com",
    projectId: "fileshare-web-app",
    storageBucket: "fileshare-web-app.appspot.com",
    messagingSenderId: "796918601761",
    appId: "1:796918601761:web:90c55997d3b49634d7ab60",
    measurementId: "G-50EBC72HK0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;