import "bootstrap/dist/css/bootstrap.min.css"
import "./scss/app.scss"
import "firebase/auth"

import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import AuthProvider from "./context/AuthContext"
import Header from "./components/Header"
import Home from "./components/Home"
import Loading from "./components/Loading"
import Login from "./components/Login"
import Manage from "./components/Manage"
import ProtectedRoute from "./components/ProtectedRoute"
import { ToastContainer } from "react-toastify"
import { useState } from "react"
const App = () => {
  const [loading, setLoading] = useState(false)
  setTimeout(() => {
    setLoading(true)
  }, 2000)
  if (loading) {
    return (
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route
              exact
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/manage"
              element={
                <ProtectedRoute>
                  <Manage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Router>
      </AuthProvider>
    )
  } else {
    return <Loading />
  }
}
export default App
