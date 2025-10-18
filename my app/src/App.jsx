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

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
            <Route path="/feature" element={<FeaturePage />} />
            <Route index element={<LandingPage />} />
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
