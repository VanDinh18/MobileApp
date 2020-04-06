import firebase from '@react-native-firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDllQxvKmzBl0KSgMwZMmO1RJWxp9XWn_k",
    authDomain: "mobileapp-12939.firebaseapp.com",
    databaseURL: "https://mobileapp-12939.firebaseio.com",
    projectId: "mobileapp-12939",
    storageBucket: "mobileapp-12939.appspot.com",
    messagingSenderId: "1088353540886",
    appId: "1:1088353540886:web:7c8b8ba4cbd390f2b88e37",
    measurementId: "G-RZJTPLXVZ1"
  };

let app;
if (!firebase.apps.length) {
    app =  firebase.initializeApp(firebaseConfig);
}

export const db = app.auth();


// import {db} from ''

