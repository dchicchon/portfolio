import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGCLC3r0-eVYoKoJ1q8p_ZT1I4ghhyi-Y",
  authDomain: "react-portfolio-f7e64.firebaseapp.com",
  databaseURL: "https://react-portfolio-f7e64.firebaseio.com",
  projectId: "react-portfolio-f7e64",
  //   storageBucket: "react-portfolio-f7e64.appspot.com",
  messagingSenderId: "369099072785",
  appId: "1:369099072785:web:7eb633130d3a87eab198b0",
  measurementId: "G-8YG14F1159",
};

firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth;
export const db = firebase.database();
// export const messagingRef = db.ref("/messaging");
