import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firestore";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { error } from "@sveltejs/kit";
import Swal from "sweetalert2";

const register = async(email, password, nama, nim, judul, dosenPembimbing1, dosenPembimbing2, dosenPenguji1, dosenPenguji2, dosenPenguji3) => {

    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
        Swal.fire({
            title: 'Error',
            text: 'Email sudah terdaftar',
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3000

        });
    } else {
        await createUserWithEmailAndPassword(auth, email, password, nim, judul, dosenPembimbing1, dosenPembimbing2, dosenPenguji1, dosenPenguji2, dosenPenguji3)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const userRef = doc(db, "mahasiswa", user.uid);
                setDoc(userRef, {
                        nama: nama,
                        email: email,
                        role: "mahasiswa",
                        tanggalLahir: "-",
                        nim: nim,
                        prodi: "Ilmu Komputer",
                    })
                    .then(() => {

                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                        return error;
                    });

                const sidangRef = doc(db, "sidang", user.uid);
                setDoc(sidangRef, {
                        id: user.uid,
                        tanggal: "-",
                        nim: nim,
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

                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                Swal.fire({
                    title: 'Sukses',
                    text: 'Silahkan masuk halaman login',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 3000
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Gagal mendaftar',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    timer: 3000
                });
            });
    }
    // @ts-ignore

}

export default register