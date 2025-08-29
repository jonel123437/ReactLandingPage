import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/current", {
          credentials: "include",
        });
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
  }, []);

  if (!authChecked) return <p>Loading...</p>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
