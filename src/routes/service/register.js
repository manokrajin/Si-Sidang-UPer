import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const register = async(email, password) => {

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
                // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
                // ..
        });
}

export default register