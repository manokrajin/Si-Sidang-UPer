// @ts-nocheck
import { userStore } from '../login/loginStore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './firestore';
import {get } from 'svelte/store';
import { doc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { data } from '../mahasiswa/service/sidangStore';

export const loginUser = async(email, password) => {
    try {
        userStore.set({...get(userStore), loading: true });
        await signInWithEmailAndPassword(auth, email, password).then(async(userCredential) => {
            const user = userCredential.user;
            const userRef = doc(db, 'dosen', user.uid);
            await getDoc(userRef).then((snapshot) => {
                const response = snapshot.data();
                userStore.set({ isLogin: true, user: { uid: user.uid, ...response }, loading: false });
            });
        });
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Email atau password salah',
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3000
        });
        userStore.set({...get(userStore), loading: false });
    }
};

export const logoutUser = async() => {
    try {
        userStore.set({...get(userStore), loading: true });
        signOut(auth).then(() => {
            userStore.set({ isLogin: false, user: {}, loading: false });
            dataStore.set([]);
        });
    } catch (error) {
        userStore.set({...get(userStore), loading: false });
    }
};