import React from "react"
import NavBar from "./NavBar"
export default function Header() {
  return (
    <div className="header d-flex align-items-center justify-content-around w-100 p-4">
      <div className="header-img">
        <img src="https://i.ibb.co/Zcfzb2s/brgIcon.png" alt="" />
      </div>
      <NavBar />
    </div>
  )
}
