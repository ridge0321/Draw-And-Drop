import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAQMFEFp7VXpAQnZk49iKzA2QtplynQp8A",
    authDomain: "tsuboru-a428d.firebaseapp.com",
    projectId: "tsuboru-a428d",
    storageBucket: "tsuboru-a428d.appspot.com",
    messagingSenderId: "576416442261",
    appId: "1:576416442261:web:ce4c3d4f4004f638e1f89c",
    measurementId: "G-3WQQ1CX2BL"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db