import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 200;

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        <ListItem button onClick={() => navigate("/admin/products")}>
          <ListItemText primary="Products" />
        </ListItem>
        {/* You can add more menu items here later */}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
