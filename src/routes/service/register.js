import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firestore";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { error } from "@sveltejs/kit";
import Swal from "sweetalert2";

const register = async(email, password, nama, judul, dosenPembimbing1, dosenPembimbing2, dosenPenguji1, dosenPenguji2, dosenPenguji3) => {

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
    await createUserWithEmailAndPassword(auth, email, password, judul, dosenPembimbing1, dosenPembimbing2, dosenPenguji1, dosenPenguji2, dosenPenguji3)
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
                    prodi: "Ilmu Komputer",
                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    return error;
                });

            const sidangRef = doc(db, "sidang", user.uid);
            setDoc(sidangRef, {
                    id: user.uid,
                    tanggal: "-",
                    waktu: "-",
                    dosenPenguji1: dosenPenguji1,
                    dosenPenguji2: dosenPenguji2,
                    dosenPenguji3: dosenPenguji3,
                    dosenPembimbing1: dosenPembimbing1,
                    dosenPembimbing2: dosenPembimbing2,
                    mahasiswa: nama,
                    judul: judul,
                    feedback: [],

                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            Swal.fire({
                title: 'Sukses',
                text: 'Harap tunggu verifikasi admin',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000
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

export default register