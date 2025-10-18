import "./App.css";
import TodoApp from "./components/TodoApp.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup.jsx";
import PrivateRoute from "./pages/routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import CreatePitch from "./pages/CreatePitch";
import GeneratedPitch from "./pages/GeneratedPitch";
import ExportPitch from "./pages/ExportPitch";
import AuthRoute from "./pages/routes/AuthRoute.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route index element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-pitch" element={<CreatePitch />} />
            <Route path="/generated-pitch" element={<GeneratedPitch />} />
            <Route path="/export-pitch" element={<ExportPitch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
