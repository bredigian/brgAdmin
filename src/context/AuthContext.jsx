import React, { createContext, useEffect, useState } from "react"
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

export const AuthContext = createContext()
function AuthProvider({ children }) {
  const [adminData, setAdminData] = useState({})
  const [userCurrent, setUserCurrent] = useState({})
  const auth = getAuth()
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  const logOut = () => {
    return signOut(auth)
  }
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (userCurrent) => {
      console.log(userCurrent)
      setUserCurrent(userCurrent)
    })
    return () => unsuscribe()
  }, [])
  useEffect(() => {
    const db = getFirestore()
    const adminCollection = collection(db, "users")
    if (userCurrent) {
      const queryAdmin = query(adminCollection, where("rol", "==", "admin"))
      getDocs(queryAdmin).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().email == userCurrent.email) {
            setAdminData({ ...doc.data() })
          }
        })
      })
    }
  }, [userCurrent])
  return (
    <AuthContext.Provider value={{ signIn, logOut, userCurrent, adminData }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
