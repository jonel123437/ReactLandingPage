import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminDashboard from "../../components/admin/AdminDashboard";

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
    <div>
      <AdminNavbar adminName={adminName} />
      <AdminDashboard />
    </div>
  );
}
