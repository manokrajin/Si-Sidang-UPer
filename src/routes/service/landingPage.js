import { db } from "./firestore";
import { collection, getDocs } from "firebase/firestore";

const sidangRef = collection(db, 'sidang');

const getAllSidang = async() => {
    try {
        const sidangSnapshot = await getDocs(sidangRef);
        const sidangList = sidangSnapshot.docs.map((doc) => doc.data());

        return sidangList;
    } catch (error) {
        console.error("Error getting sidang data:", error);
        throw error;
    }
}

export default getAllSidang;