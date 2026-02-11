import { db } from "./firebase"
import {
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore"

export async function getUser(email) {
  const ref = doc(db, "users", email)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}

export async function createUser({ name, email, password }) {
  const ref = doc(db, "users", email)

  await setDoc(ref, {
    name,
    email,
    password, // plain text for hackathon
    profileCompleted: false,
    createdAt: new Date()
  })
}

export async function updateUserProfile(email, data) {
  const ref = doc(db, "users", email)
  await updateDoc(ref, {
    ...data,
    profileCompleted: true
  })
}

export async function verifyUser(email, password) {
  const user = await getUser(email)
  if (!user) return null

  if (user.password !== password) return null

  return user
}
