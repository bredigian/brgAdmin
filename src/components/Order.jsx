import React, { useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import OrderDetail from "./OrderDetail"
export default function Order({ data }) {
  const [showMore, setShowMore] = useState(false)
  const handleShowMore = (e) => {
    e.preventDefault()
    setShowMore(!showMore)
  }
  return (
    <div className="orders-container__item d-flex flex-column align-items-center w-100 p-4">
      <div className="orders-container__item-info d-flex align-items-center gap-4 w-100">
        <p className="m-0">ID {data.id}</p>
        <p className="m-0">{data.buyer.name}</p>
        <p className="m-0">${data.total}</p>
        <button onClick={handleShowMore} className={showMore && "showDetails"}>
          <BsChevronDown />
        </button>
      </div>
      <OrderDetail data={data} show={showMore} />
    </div>
  )
}
