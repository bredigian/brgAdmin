import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
export default function NavBar() {
  const { userCurrent, logOut } = useContext(AuthContext)
  const handleLogOut = () => {
    logOut()
  }
  return (
    <nav className="navbar">
      <ul className="navbar-ul d-flex align-items-center">
        {userCurrent ? (
          <>
            <NavLink
              to="/home"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li className="navbar-ul__item">Orders</li>
            </NavLink>
            <NavLink
              to="/manage"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li className="navbar-ul__item">Manage</li>
            </NavLink>
            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "black" }}
              onClick={handleLogOut}
            >
              <li className="navbar-ul__item">Log Out</li>
            </NavLink>
          </>
        ) : (
          <>
            <p className="navbar-title m-0">
              Welcome to brg's Shop Administration
            </p>
          </>
        )}
      </ul>
    </nav>
  )
}
