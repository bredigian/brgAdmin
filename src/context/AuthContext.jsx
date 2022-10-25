import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import React, { createContext, useEffect, useState } from "react"
export const AuthContext = createContext()
function AuthProvider({ children }) {
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
  return (
    <AuthContext.Provider value={{ signIn, logOut, userCurrent }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
