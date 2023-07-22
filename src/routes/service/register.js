import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const register = async(email, password, nama) => {

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const userRef = doc(db, "mahasiswa", user.uid);
            setDoc(userRef, {
                    nama: nama,
                    email: email,
                    role: "mahasiswa",
                    tanggalLahir: "-",
                    nim: "-",
                    prodi: "-",
                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
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