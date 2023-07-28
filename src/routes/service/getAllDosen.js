import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firestore';
import { userStore } from '../login/loginStore';

const dosenRef = collection(db, 'dosen');
const getAllDosen = async() => {
    try {
        const dosenSnapshot = await getDocs(dosenRef);
        const dosenList = dosenSnapshot.docs.map((doc) => doc.data());
        return dosenList;
    } catch (error) {
        console.error("Error getting dosen data:", error);
        throw error;
    }
};

export default getAllDosen;