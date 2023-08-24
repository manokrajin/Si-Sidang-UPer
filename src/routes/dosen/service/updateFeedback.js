import Swal from "sweetalert2";
import { db } from "../../service/firestore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export const updateFeedback = async(id, nama, feedback) => {
    try {
        const docRef = doc(db, "sidang", id);
        await updateDoc(docRef, {
            feedback: arrayUnion({ nama, feedback }),
        });
        Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Feedback berhasil ditambahkan",
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Feedback gagal ditambahkan",
        });
    }
}