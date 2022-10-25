import React from "react"
import { JellyTriangle } from "@uiball/loaders"
const Loading = () => {
  return (
    <div className="loader d-flex flex-column align-items-center w-100">
      <JellyTriangle size={100} />
    </div>
  )
}

export default Loading
