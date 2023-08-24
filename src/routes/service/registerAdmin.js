import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firestore";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { error } from "@sveltejs/kit";
import Swal from "sweetalert2";

const registerAdmin = async(email, password) => {

    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
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
                .then(() => {})
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    return error;
                });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK',
                timer: 3000

            });
            return error;
        });
}

export default registerAdmin