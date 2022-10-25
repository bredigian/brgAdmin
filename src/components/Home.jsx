import React, { useEffect, useState } from "react"
import { getFirestore, collection, getDocs } from "firebase/firestore"
import Order from "./Order"
import AwaitingOrders from "./AwaitingOrders"
export default function Home() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    setInterval(() => {
      const db = getFirestore()
      const orders = collection(db, "orders")
      getDocs(orders).then((snapshot) => {
        setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      })
    }, 5000)
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
