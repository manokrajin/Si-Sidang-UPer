 import { db } from "../../service/firestore";
 import { doc, updateDoc } from "firebase/firestore";
 import Swal from "sweetalert2";

 export const updateSidangDetail = async(id, tanggal, waktu) => {
     try {
         const docRef = doc(db, "sidang", id);
         await updateDoc(docRef, {
             tanggal: tanggal,
         });
         await updateDoc(docRef, {
             waktu: waktu,
         });
         Swal.fire({
             icon: "success",
             title: "Berhasil",
             text: "Data berhasil diubah",
         });
     } catch (error) {
         // Swal.fire({
         //     icon: "error",
         //     title: "Gagal",
         //     text: "Data gagal diubah",
         // });
         console.log(error);
     }
 }