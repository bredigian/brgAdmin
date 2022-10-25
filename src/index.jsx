import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVTpn4gkpigFB020PzPBufRhRlnEwB_TE",
  authDomain: "react-ecommerce-c2d6b.firebaseapp.com",
  projectId: "react-ecommerce-c2d6b",
  storageBucket: "react-ecommerce-c2d6b.appspot.com",
  messagingSenderId: "248474406273",
  appId: "1:248474406273:web:ca983deeeff99c3b7b6c80",
}

// Initialize Firebase
initializeApp(firebaseConfig)
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
