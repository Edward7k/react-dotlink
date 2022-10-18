import "./App.css";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import AllLinks from "./pages/AllLinks";
import AddLink from "./pages/AddLink";
import EditLink from "./pages/EditLink";
import ViewLink from "./pages/ViewLink";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/links" element={<AllLinks />} />
          <Route path="/dashboard/new" element={<AddLink />} />
          <Route path="/dashboard/edit/:id" element={<EditLink />} />
        </Route>
        <Route path="/l/:url_code" element={<ViewLink />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
          }
        />
        <Route
          path="/"
          exact
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Home />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
