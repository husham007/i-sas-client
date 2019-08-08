import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyBdJHe-13ARbJ98EgyKj7ALtNVaXdXJC5o",
    authDomain: "studentassessmentsystem-d32fc.firebaseapp.com",
    databaseURL: "https://studentassessmentsystem-d32fc.firebaseio.com",
    projectId: "studentassessmentsystem-d32fc",
    storageBucket: "",
    messagingSenderId: "115222759804",
    appId: "1:115222759804:web:0babe83ac6ab38f0"
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.firestore().settings({  });

export default firebase;