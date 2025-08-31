import { AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LPNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ background: "linear-gradient(to right, #bb268c, #f0768c)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", maxWidth: 1200, mx: "auto", width: "100%" }}>

          {/* Left - Title */}
          <Typography
            variant="h6"
            component={Link}
            to="/lp"
            sx={{ textDecoration: "none", color: "#fff", fontWeight: "bold" }}
          >
            Shopatos
          </Typography>

          {/* Right - Desktop links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>
            <Button component={Link} to="/login" sx={{ color: "#fff" }}>
              Login
            </Button>
          </Box>

          {/* Mobile menu icon */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "#fff" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem button component={Link} to="/login" onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
