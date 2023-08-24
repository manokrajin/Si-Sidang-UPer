// @ts-nocheck
import { adminLoginStore } from '../login/adminLoginStore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './firestore';
import {get } from 'svelte/store';
import { doc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { data } from '../mahasiswa/service/sidangStore';



export const loginUser = async(email, password) => {
    try {
        adminLoginStore.set({...get(adminLoginStore), loading: true });
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userRef = doc(db, 'admin', user.uid);
        const snapshot = await getDoc(userRef);
        const response = snapshot.data();
        adminLoginStore.set({ isLogin: true, user: { uid: user.uid, ...response }, loading: false });
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Email atau password salah',
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3000
        });
        adminLoginStore.set({...get(adminLoginStore), loading: false });
        throw error; // Re-throw the error to reject access.
    }
};

export const logoutUser = async() => {
    try {
        adminLoginStore.set({...get(adminLoginStore), loading: true });
        signOut(auth).then(() => {
            adminLoginStore.set({ isLogin: false, user: {}, loading: false });
            dataStore.set([]);
        });
    } catch (error) {
        adminLoginStore.set({...get(adminLoginStore), loading: false });
    }
};