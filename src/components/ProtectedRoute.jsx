import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
const ProtectedRoute = ({ children }) => {
  const { userCurrent } = useContext(AuthContext)
  if (!userCurrent) {
    return <Navigate to="/" />
  }
  return children
}
export default ProtectedRoute
