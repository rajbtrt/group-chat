import axios from "axios";
// import JwtService from "../services/JwtService";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { firebaseInitConfig } from "../helpers/firebaseConfig";

const url = import.meta.env.VITE_API_URL;
const db = getFirestore(firebaseInitConfig);

export default {
  // Login

  register(credintials) {
    const auth = getAuth();

    return createUserWithEmailAndPassword(
      auth,
      credintials.email,
      credintials.password
    )
      .then(() => {
        console.log(firebase.auth().currentUser.uid);
        let userData = addDoc(collection(db, "users"), {
          email: "demo@demo.com",
        });
        console.log(userData)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  },
};
