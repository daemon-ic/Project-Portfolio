import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCVxJVhs4gLrf0Fwv1srhw7H5MYs6Wh1jY",
  authDomain: "portfolio-50001.firebaseapp.com",
  projectId: "portfolio-50001",
  storageBucket: "portfolio-50001.appspot.com",
  messagingSenderId: "218186648975",
  appId: "1:218186648975:web:cce9e2c675a97d20b10ffa",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, fire as default };
