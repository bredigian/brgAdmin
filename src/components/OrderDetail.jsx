import React from "react"
import { deleteDoc, doc, getFirestore } from "firebase/firestore"
import { MdOutlineDone } from "react-icons/md"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
export default function OrderDetail({ data, show }) {
  const MySwal = withReactContent(Swal)
  const confirmOrder = () => {
    const db = getFirestore()
    const orderDone = doc(db, "orders", data.id)
    deleteDoc(orderDone).then(console.log(`${data.id} done!.`))
    MySwal.fire({
      title: "Order done!",
      icon: "success",
      iconColor: "#000",
      color: "#000",
      confirmButtonColor: "#000",
    })
  }
  return (
    <div
      className={`${
        show && "show"
      } orders-container__item-details d-flex flex-column align-items-center w-100 p-4`}
    >
      <div className="orders-container__item-details__item-info d-flex align-items-center justify-content-between p-4 w-100">
        <p className="m-0">Buyer name</p>
        <p className="m-0">{data.buyer.name}</p>
      </div>
      <div className="orders-container__item-details__item-info d-flex align-items-center justify-content-between p-4 w-100">
        <p className="m-0">Buyer phone</p>
        <p className="m-0">{data.buyer.phone}</p>
      </div>
      <div className="orders-container__item-details__item-info d-flex align-items-center justify-content-between p-4 w-100">
        <p className="m-0">Buyer e-mail</p>
        <p className="m-0">{data.buyer.email}</p>
      </div>
      <div className="orders-container__item-details__item-items d-flex flex-column align-items-start p-4 w-100">
        <p className="m-0">Items</p>
        <div className="orders-container__item-details__item-items-detail d-flex flex-column align-items-center w-100">
          {data.items.map((item) => (
            <div className="orders-container__item-details__item-items-detail__item d-flex align-items-center justify-content-between w-100 p-4">
              <p className="m-0">{item.name}</p>
              <p className="m-0">x{item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="orders-container__item-details__item-info d-flex align-items-center justify-content-between p-4 w-100">
        <p className="m-0">Total</p>
        <p className="m-0">${data.total}</p>
      </div>
      <button className="buttonDone" onClick={confirmOrder}>
        <MdOutlineDone />
      </button>
    </div>
  )
}
