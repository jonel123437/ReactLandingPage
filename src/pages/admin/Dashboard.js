import React, { useEffect, useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function Dashboard() {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/current", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setAdminName(data.name);
      } catch (err) {
        console.error("Failed to fetch admin info:", err);
      }
    };
    fetchAdmin();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AdminHeader adminName={adminName} />
      <AdminSidebar />

      {/* Main content area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {/* This is where nested routes (dashboard, products, register, etc.) will render */}
        <Outlet />
      </Box>
    </Box>
  );
}
