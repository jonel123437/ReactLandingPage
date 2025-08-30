import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ role = "user" }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Determine which endpoint to check
        const endpoint =
          role === "admin"
            ? "http://localhost:5000/api/admin/current"
            : "http://localhost:5000/api/auth/current";

        const res = await fetch(endpoint, { credentials: "include" });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [role]);

  if (!authChecked) return <p>Loading...</p>;

  // Redirect based on role
  if (!isAuthenticated) {
    return <Navigate to={role === "admin" ? "/admin/login" : "/login"} replace />;
  }

  return <Outlet />;
}
