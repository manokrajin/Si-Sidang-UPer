import { doc, getDoc } from "firebase/firestore"
import { db } from "./firestore"

export const getDokumenTADetail = async (dokumentID) => {
    try {
        const dokumenRef = doc(db, "sidang", dokumentID)
        const dokumenData = (await getDoc(dokumenRef)).data()
        return dokumenData
    } catch(e) {
        console.warn("INI ERROR YAAWWWWW!!!!!")
    }
}