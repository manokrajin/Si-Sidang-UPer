import { get } from 'svelte/store';
import { db } from './firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { userStore } from '../login/loginStore';

const sidangRef = collection(db, 'sidang');

const getAllSidang = async () => {
	try {
		const dosenName = get(userStore).user.nama;
		const q1 = query(sidangRef, where('dosenPembimbing1', '==', dosenName));
		const q2 = query(sidangRef, where('dosenPembimbing2', '==', dosenName));
		const q3 = query(sidangRef, where('dosenPenguji1', '==', dosenName));
		const q4 = query(sidangRef, where('dosenPenguji2', '==', dosenName));
		const q5 = query(sidangRef, where('dosenPenguji3', '==', dosenName));

		const sidangList = await Promise.all([getDocs(q1), getDocs(q2)])
			.then((querySnapshots) => {
                const results = []
				querySnapshots.forEach((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						results.push(doc.data());
					});
				});
                return results
			})
			.catch((error) => {
				console.error('Error getting documents:', error);
			});

		return sidangList;
	} catch (error) {
		console.error('Error getting sidang data:', error);
		throw error;
	}
};

export default getAllSidang;
