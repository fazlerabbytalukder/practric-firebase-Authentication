import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initilizeFirebase = () => {
    initializeApp(firebaseConfig);
}

export default initilizeFirebase;