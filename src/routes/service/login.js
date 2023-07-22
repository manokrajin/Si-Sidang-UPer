// @ts-nocheck
import { userStore } from '../login/loginStore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './firestore';
import { get } from 'svelte/store';
import { doc, getDoc } from 'firebase/firestore';

export const loginUser = async (email, password) => {
	try {
		userStore.set({ ...get(userStore), loading: true });
		await signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
			const user = userCredential.user;
			const userRef = doc(db, 'mahasiswa', user.uid);
			await getDoc(userRef).then((snapshot) => {
				const response = snapshot.data()
                userStore.set({ isLogin: true, user: { uid: user.uid, ...response }, loading: false });
			});
		});
	} catch (error) {
        console.log(error)
		userStore.set({ ...get(userStore), loading: false });
	}
};

export const logoutUser = async () => {
	try {
		userStore.set({ ...get(userStore), loading: true });
		signOut(auth).then(() => {
			userStore.set({ isLogin: false, user: {}, loading: false });
		});
	} catch (error) {
		userStore.set({ ...get(userStore), loading: false });
	}
};
