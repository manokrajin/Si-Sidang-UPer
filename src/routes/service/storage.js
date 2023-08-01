import { storage } from "./firestore";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { userStore } from "../login/loginStore";
import { data } from "../mahasiswa/service/sidangStore";



const fileRef = ref(storage, 'File SKripsi/');

const uploadFile = async(file, fileName, type) => {
    try {
        const currentUserName = await new Promise((resolve) => {
            const unsubscribe = userStore.subscribe((value) => {
                resolve(value.user.nama);
                unsubscribe();
            });
        });

        if (!currentUserName) {
            // If the user is not logged in, return an empty array
            return [];
        }

        const storageRef = getStorage();
        const fileRef = ref(storageRef, `File Skripsi/${currentUserName}/${type}/${fileName || file.name}`);
        await uploadBytes(fileRef, file);
        console.log('Uploaded a blob or file!');
    } catch (error) {
        console.log(error);
    }
}

const getFile = async() => {
    try {
        const currentUserName = await new Promise((resolve) => {
            const unsubscribe = userStore.subscribe((value) => {
                resolve(value.user.nama);
                unsubscribe();
                2
            });
        });

        if (!currentUserName) {
            // If the user is not logged in, return an empty array
            return [];
        }

        const storageRef = getStorage();
        let child = ['proposal', 'laporan', 'syarat'];
        let file = [];
        const xhr = new XMLHttpRequest();



        // @ts-ignore
        for (child of child) {
            const fileRef = ref(storage, `File Skripsi/${currentUserName}/${child}`);
            const res = await listAll(fileRef);
            const filePromises = res.items.map(async(itemRef) => {
                try {
                    const url = await getDownloadURL(itemRef);
                    return { name: itemRef.name, url: url, type: child };
                } catch (error) {
                    console.log(error);
                    return null;
                }
            });

            const files = await Promise.all(filePromises);
            file.push(...files.filter((file) => file !== null));
        }

        return file;
    } catch (error) {
        console.error("Error getting file data:", error);
        throw error;
    }
};


const getDosenFile = async(currentUserName) => {
    try {
        const storageRef = getStorage();
        let child = ['proposal', 'laporan', 'syarat'];
        let file = [];

        for (child of child) {
            const fileRef = ref(storage, `File Skripsi/${currentUserName}/${child}`);
            const res = await listAll(fileRef);
            const filePromises = res.items.map(async(itemRef) => {
                try {
                    const url = await getDownloadURL(itemRef);
                    return { name: itemRef.name, url: url, type: child };
                } catch (error) {
                    console.log(error);
                    return null;
                }
            });

            const files = await Promise.all(filePromises);
            file.push(...files.filter((file) => file !== null));
        }

        return file;
    } catch (error) {}
}

export { uploadFile, getFile, getDosenFile };