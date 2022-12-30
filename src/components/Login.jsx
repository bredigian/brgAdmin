import "react-toastify/dist/ReactToastify.css"

import React, { useContext, useEffect, useState } from "react"
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"

import { AuthContext } from "../context/AuthContext"
import Loading from "./Loading"
import SubmitLoader from "./SubmitLoader"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [logging, setLogging] = useState(false)
  const [admin, setAdmin] = useState(null)
  const navigate = useNavigate()
  const { signIn } = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLogging(true)
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    if (admin != null) {
      signIn(user.email, user.password)
      toast.success("Logged successfully", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      setTimeout(() => {
        navigate("/home")
      }, 2500)
    } else {
      console.log(e.message)
      setTimeout(() => {
        toast.error("Email/Password incorrect", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        setLogging(false)
      }, 1500)
    }
  }
  useEffect(() => {
    const db = getFirestore()
    const queryAdmin = query(
      collection(db, "users"),
      where("rol", "==", "admin")
    )
    getDocs(queryAdmin).then((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.data().email == email && doc.data().password == password) {
          setAdmin(doc.data())
        }
      })
    })
    console.log("useEffect Login")
  }, [admin])
  setTimeout(() => {
    setLoading(true)
  }, 2500)
  if (loading) {
    return (
      <div className="login d-flex flex-column align-items-center w-75 gap-4">
        <p className="login-title m-0">Log In</p>
        <form
          className="login-form d-flex flex-column align-items-center gap-3 p-5"
          onSubmit={handleSubmit}
        >
          <div className="login-form__input d-flex flex-column align-items-start gap-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-form__input d-flex flex-column align-items-start gap-2">
            <label htmlFor="">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="submitContainer">
            {!logging ? (
              <input className="submit" type="submit" value="Log In" />
            ) : (
              <SubmitLoader />
            )}
          </div>
        </form>
      </div>
    )
  } else {
    return <Loading />
  }
}

export default Login
