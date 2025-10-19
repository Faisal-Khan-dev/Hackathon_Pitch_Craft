import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup.jsx";
import PrivateRoute from "./pages/routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import AuthRoute from "./pages/routes/AuthRoute.jsx";
import LandingPage from "./pages/landing.jsx";
import Navbar from "./components/Navbar.jsx";
import FeaturePage from "./pages/Featurepage.jsx";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const [show, setShow] = useState(true)
  
  useEffect(() => {
    if (localStorage.getItem("uid")) {
      setShow(false);
    } else {
      setShow(true)
    }
  }, [localStorage.getItem("uid")]);
    return (
      <>
        <BrowserRouter>
          <Navbar show={show} />
          <ToastContainer
            
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route index element={<LandingPage show={show} />} />
            <Route path="/feature" element={<FeaturePage />} />
            <Route element={<AuthRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
}

export default App;
