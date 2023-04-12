import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCGCLC3r0-eVYoKoJ1q8p_ZT1I4ghhyi-Y",
    authDomain: "react-portfolio-f7e64.firebaseapp.com",
    databaseURL: "https://react-portfolio-f7e64.firebaseio.com",
    projectId: "react-portfolio-f7e64",
    storageBucket: "react-portfolio-f7e64.appspot.com",
    messagingSenderId: "369099072785",
    appId: "1:369099072785:web:7eb633130d3a87eab198b0",
    measurementId: "G-BV2V95801K"
}

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);