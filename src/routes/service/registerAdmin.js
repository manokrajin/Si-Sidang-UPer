import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firestore";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { error } from "@sveltejs/kit";
import Swal from "sweetalert2";

const registerAdmin = async(email, password) => {

    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
        // Email already exists, handle this case (e.g., display an error message)
        console.log("Email already exists");
        Swal.fire({
            title: 'Error',
            text: 'Email sudah terdaftar',
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3000

        });
    }
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const userRef = doc(db, "admin", user.uid);
            setDoc(userRef, {
                    email: email,
                    role: "admin",
                    prodi: "Ilmu Komputer",
                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    return error;
                });


            console.log(user)
                // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)


        });
}

export default registerAdmin