import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import TaskForm from "./pages/TaskForm";
import Layout from "./components/Layout";

import { useAuth } from "./context/AuthContext";
import { useLoader } from "./context/LoaderContext";
import { setupInterceptors } from "./api";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
};

export default function App() {
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    setupInterceptors(showLoader, hideLoader);
  }, []);

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="tasks/new" element={<TaskForm />} />
        <Route path="tasks/:id" element={<TaskForm />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
