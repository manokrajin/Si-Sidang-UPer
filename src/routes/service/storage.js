import { storage } from "./firestore";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
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
    } catch (error) {
        console.error("Error uploading file:", error);
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
                    return null;
                }
            });

            const files = await Promise.all(filePromises);
            file.push(...files.filter((file) => file !== null));
        }

        return file;
    } catch (error) {}
}

const deleteFile = async(fileName, type) => {
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
        const fileRef = ref(storageRef, `File Skripsi/${currentUserName}/${type}/${fileName}`);

        await deleteObject(fileRef);


        // Update the file list in your store or component state
        // For example, if you are using the `data` store from sidangStore:
        const updatedData = data.update((items) => items.filter(item => item.name !== fileName));
    } catch (error) {
        console.error("Error deleting file:", error);
    }
};

const downloadFile = async(fileName, type) => {
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
        const fileRef = ref(storageRef, `File Skripsi/${currentUserName}/${type}/${fileName}`);

        const url = await getDownloadURL(fileRef);
        window.open(url, '_blank'); // Buka URL file di tab baru
    } catch (error) {
        console.error("Error downloading file:", error);
    }
};
export { uploadFile, getFile, getDosenFile, deleteFile, downloadFile };