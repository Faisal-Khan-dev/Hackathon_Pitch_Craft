import "./App.css";
import TodoApp from "./components/TodoApp.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/signUp.jsx";
import PrivateRoute from "./pages/routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import AuthRoute from "./pages/routes/AuthRoute.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route index element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
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
