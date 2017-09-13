import firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAAj_kN5-MVRKuF7wYgh3uh4ntoHgI_dGY",
    authDomain: "react-exam-8580b.firebaseapp.com",
    databaseURL: "https://react-exam-8580b.firebaseio.com",
    projectId: "react-exam-8580b",
    storageBucket: "react-exam-8580b.appspot.com",
    messagingSenderId: "575634261811"
  };
  firebase.initializeApp(config);

  export default firebase;

