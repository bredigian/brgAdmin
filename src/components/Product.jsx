import { AiOutlineDelete } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import React from "react"

const Product = ({ productData, deleteItem }) => {
  return (
    <div className="manage-products__item d-flex flex-column align-items-center justify-content-between gap-4">
      <div className="manage-products__item-img">
        <img src={productData.img} alt="" />
      </div>
      <p className="manage-products__item-name">{productData.name}</p>
      <p className="manage-products__item-price">${productData.price}</p>
      <p className="manage-products__item-stock">Stock {productData.stock}</p>
      <div className="manage-products__item-options d-flex align-items-center w-100 justify-content-around">
        <button className="buttonOptions">
          <FiEdit />
        </button>
        <button className="buttonOptions" onClick={deleteItem}>
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  )
}

export default Product
