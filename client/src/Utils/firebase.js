import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyCGCLC3r0-eVYoKoJ1q8p_ZT1I4ghhyi-Y",
  authDomain: "react-portfolio-f7e64.firebaseapp.com",
  databaseURL: "https://react-portfolio-f7e64.firebaseio.com",
  projectId: "react-portfolio-f7e64",
  messagingSenderId: "369099072785",
  appId: "1:369099072785:web:7eb633130d3a87eab198b0",
  measurementId: "G-8YG14F1159",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const analytics = firebase.analytics();
export function analyticsClick(e) {
  analytics.logEvent(e.currentTarget.className);
}
