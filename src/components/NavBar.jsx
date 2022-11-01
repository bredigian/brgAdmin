import React, { useContext } from "react"

import { AuthContext } from "../context/AuthContext"
import { NavLink } from "react-router-dom"

export default function NavBar() {
  const { userCurrent, logOut, adminData } = useContext(AuthContext)
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
            <li className="navbar-ul__item">
              {adminData.firstName}
              <ul className="d-flex flex-column align-items-start">
                <NavLink
                  to="/"
                  className="link"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={handleLogOut}
                >
                  <li>Log Out</li>
                </NavLink>
              </ul>
            </li>
          </>
        ) : (
          <>
            <p className="navbar-title m-0">brg's Shop Administration</p>
          </>
        )}
      </ul>
    </nav>
  )
}
