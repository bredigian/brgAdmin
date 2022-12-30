import { addDoc, collection, doc, getDocs, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"

import { IoAdd } from "react-icons/io5"
import Product from "./Product"
import React from "react"
import Swal from "sweetalert2"
import { useForm } from "react-hook-form"
import withReactContent from "sweetalert2-react-content"

const Manage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [addItem, setAddItem] = useState(false)
  const MySwal = withReactContent(Swal)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onHandleAddItem = () => {
    setAddItem(!addItem)
  }
  const onHandleDeleteItem = (product) => {
    MySwal.fire({
      title: "Are you sure for delete this product?",
      confirmButtonText: "Confirm",
      showCancelButton: true,
    }).then((result) => {
      // if (result.isConfirmed) {
      //   const db = getFirestore()
      //   const productsCollection = collection(db, "items")
      //   getD
      // }
    })
  }
  const onHandleSubmit = (data) => {
    const item = {
      categoryId: data.category,
      img: data.img,
      price: data.price,
      name: data.name,
      stock: data.stock,
    }
    const db = getFirestore()
    console.log("submitAccess")
    const productsCollection = collection(db, "items")
    addDoc(productsCollection, item).then(({ id }) =>
      MySwal.fire({
        title: `Product ${id} created successfully!`,
        color: "#000000",
        icon: "success",
        iconColor: "#000000",
        confirmButtonColor: "#000000",
      })
    )
  }
  useEffect(() => {
    const db = getFirestore()
    const productsCollection = collection(db, "items")
    getDocs(productsCollection).then((snapshot) => {
      console.log(snapshot.docs.map((doc) => doc.id))
      setProducts(snapshot.docs.map((doc) => doc.data()))
    })
    const categoriesCollection = collection(db, "categories")
    getDocs(categoriesCollection).then((snapshot) => {
      setCategories(snapshot.docs.map((cat) => cat.data().name))
    })
    console.log("useEffect Manage")
  }, [])
  return (
    <div className="manage d-flex flex-column align-items-center p-4 w-75">
      <div className="manage-container d-flex w-100 align-items-center justify-content-between p-4">
        <p className="m-0 manage-container__title">Manage</p>
        <button className="buttonAdd" onClick={onHandleAddItem}>
          <IoAdd />
        </button>
      </div>
      <div
        className={`${
          addItem ? "showAddItem" : ""
        } manage-container__newElement d-flex flex-column align-items-center w-50 p-4`}
      >
        <p>Add item</p>
        <form
          className="form d-flex flex-column align-items-center"
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <input
            type="text"
            placeholder="Name"
            required
            {...register("name")}
          />
          <input
            type="text"
            placeholder="Price"
            required
            {...register("price")}
          />
          <input
            type="text"
            placeholder="Stock"
            required
            {...register("stock")}
          />
          <select id="category" {...register("category")}>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="URL Image"
            required
            {...register("img", {
              required: true,
            })}
          />
          <input type="submit" />
        </form>
      </div>
      <div
        className={`${
          addItem ? `backBlur` : ``
        } manage-products d-flex align-items-center justify-content-center flex-wrap gap-4 p-4`}
      >
        {products.map((product) => (
          <Product
            key={product.name}
            productData={product}
            deleteItem={onHandleDeleteItem}
          />
        ))}
      </div>
    </div>
  )
}

export default Manage
