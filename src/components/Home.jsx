import React, { useEffect, useState } from "react"
import { collection, getDocs, getFirestore } from "firebase/firestore"

import AwaitingOrders from "./AwaitingOrders"
import Order from "./Order"

export default function Home() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const db = getFirestore()
    const orders = collection(db, "orders")
    getDocs(orders).then((snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    })
    console.log("useEffect Home")
  }, [])
  return (
    <>
      {orders.length == 0 ? (
        <AwaitingOrders />
      ) : (
        <div className="orders d-flex flex-column align-items-center gap-3 w-75">
          <p className="orders-title m-0">Orders</p>
          <div className="orders-container d-flex flex-column align-items-center w-100 gap-3">
            {orders.map((order) => (
              <Order key={order.id} data={order} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
