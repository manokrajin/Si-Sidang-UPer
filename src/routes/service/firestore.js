import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCAcRZIWpaWH2q5RRK63cEQ6FtXkIA2H5k",
    authDomain: "si-sidang-uper-50c1e.firebaseapp.com",
    projectId: "si-sidang-uper-50c1e",
    storageBucket: "si-sidang-uper-50c1e.appspot.com",
    messagingSenderId: "1016324555277",
    appId: "1:1016324555277:web:0bafd40a88aa9248140b44",
    measurementId: "G-L5ZJWQZ5S1"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const mahasiswaRef = collection(db, "mahasiswa");

const getMahasiswa = async() => {
    try {
        const mahasiswaSnapshot = await getDocs(mahasiswaRef);
        const mahasiswaList = mahasiswaSnapshot.docs.map((doc) => doc.data());
        return mahasiswaList;
    } catch (error) {
        console.error("Error getting mahasiswa data:", error);
        throw error;
    }
};



const dosenRef = collection(db, "dosen");
const getDosen = async() => {
    try {
        const dosenSnapshot = await getDocs(dosenRef);
        const dosenList = dosenSnapshot.docs.map((doc) => doc.data());
        return dosenList;
    } catch (error) {
        console.error("Error getting dosen data:", error);
        throw error;
    }
}

export { getMahasiswa, getDosen, db, auth, storage };