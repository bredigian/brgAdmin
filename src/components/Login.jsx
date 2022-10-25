import React, { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Loading from "./Loading"
import SubmitLoader from "./SubmitLoader"
function Login() {
  const [loading, setLoading] = useState(false)
  const [logging, setLogging] = useState(false)
  const navigate = useNavigate()
  const { signIn } = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLogging(true)
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    try {
      await signIn(user.email, user.password)
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
    } catch (e) {
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
  setTimeout(() => {
    setLoading(true)
  }, 2500)
  if (loading) {
    return (
      <div className="login d-flex flex-column align-items-center w-100 gap-4">
        <p className="login-title m-0">Log In</p>
        <form
          className="login-form d-flex flex-column align-items-center gap-3 p-5"
          onSubmit={handleSubmit}
        >
          <div className="login-form__input d-flex flex-column align-items-start gap-2">
            <label htmlFor="">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="login-form__input d-flex flex-column align-items-start gap-2">
            <label htmlFor="">Password</label>
            <input type="password" id="password" />
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
