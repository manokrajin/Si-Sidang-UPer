import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../service/firestore';
import { userStore } from '../../login/loginStore';




const sidangRef = collection(db, 'sidang');
const getSidang = async() => {
    try {
        const currentUserUid = await new Promise((resolve) => {
            const unsubscribe = userStore.subscribe((value) => {
                resolve(value.user.uid);
                unsubscribe();
            });
        });

        if (!currentUserUid) {
            // If the user is not logged in, return an empty array
            return [];
        }

        const sidangSnapshot = await getDocs(query(sidangRef, where("id", "==", currentUserUid)));
        const sidangList = sidangSnapshot.docs.map((doc) => doc.data());

        return sidangList;
    } catch (error) {
        console.error("Error getting sidang data:", error);
        throw error;
    }
};

export default getSidang;