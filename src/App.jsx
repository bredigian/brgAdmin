import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./scss/app.scss"
import Header from "./components/Header"
import Home from "./components/Home"
import "firebase/auth"
import AuthProvider from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./components/Login"
import { ToastContainer } from "react-toastify"
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/manage"
            element={
              <ProtectedRoute>
                <></>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </AuthProvider>
  )
}
export default App
