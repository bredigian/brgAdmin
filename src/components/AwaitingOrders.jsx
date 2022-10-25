import React from "react"
import { RaceBy } from "@uiball/loaders"
export default function AwaitingOrders() {
  return (
    <div className="loader d-flex flex-column align-items-center">
      <RaceBy size={200} />
      <p className="mb-0 mt-3">Awaiting orders...</p>
    </div>
  )
}
