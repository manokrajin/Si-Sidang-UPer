import { db } from "../../service/firestore";
import { collection, query, where, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import Swal from "sweetalert2";

export const updateJadwalDosen = async(nama, tanggal, jamAwal, jamAkhir) => {
    try {
        const dosenCollectionRef = collection(db, "dosen");

        // Create a query to find the document where the 'nama' field matches the parameter
        const q = query(dosenCollectionRef, where("nama", "==", nama));

        // Execute the query and get the snapshot of matching documents
        const querySnapshot = await getDocs(q);

        // Check if there's a matching document
        if (!querySnapshot.empty) {
            // Get the first document in the snapshot (assuming 'nama' is unique)
            const docRef = querySnapshot.docs[0].ref;

            // Update the 'waktuKosong' field using arrayUnion
            await updateDoc(docRef, {
                waktuKosong: arrayUnion({ tanggal, jamAwal, jamAkhir }),
            });

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Jadwal berhasil diupdate",
            });

        } else {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Lengkapi data dengan benar",
            });

        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Jadwal gagal diupdate",
        });
    }
};