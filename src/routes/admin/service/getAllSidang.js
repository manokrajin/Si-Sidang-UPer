import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../service/firestore';
import { userStore } from '../../login/loginStore';




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
};

export default getAllSidang;