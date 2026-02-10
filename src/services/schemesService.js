import { db } from "./firebase"
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore"

// Fetch all schemes
export async function getAllSchemes() {
  try {
    const querySnapshot = await getDocs(
      collection(db, "schemes")
    )

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error fetching schemes:", error)
    return []
  }
}

// Fetch single scheme by ID
export async function getSchemeById(id) {
  try {
    const docRef = doc(db, "schemes", id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) return null

    return {
      id: docSnap.id,
      ...docSnap.data(),
    }
  } catch (error) {
    console.error("Error fetching scheme:", error)
    return null
  }
}
