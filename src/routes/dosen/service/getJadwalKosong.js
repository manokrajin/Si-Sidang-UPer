import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../service/firestore";
import { userStore } from "../../login/loginStore";

const jadwalRef = collection(db, "dosen");


const getJadwalKosong = async(dosenId) => {
    try {

        const jadwalDoc = doc(db, "dosen", dosenId);
        const jadwalSnapshot = await getDoc(jadwalDoc);
        const jadwalData = jadwalSnapshot.data()
        const jadwalKosong = jadwalData.waktuKosong;
        return jadwalKosong;
    } catch (error) {
        console.error("Error getting jasdwal data:", error);
        throw error;
    }
};

const deleteJadwalKosong = async(dosenId, jadwalKosong) => {
    try {
        const jadwalDoc = doc(db, "dosen", dosenId);
        await updateDoc(jadwalDoc, {
            waktuKosong: jadwalKosong
        });
    } catch (error) {
        console.error("Error getting jasdwal data:", error);
        throw error;
    }
};

export { getJadwalKosong, deleteJadwalKosong };