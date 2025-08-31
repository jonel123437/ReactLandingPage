import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import { CartContext } from "../cart/CartContext";

export default function UserNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/current", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    navigate("/lp");
  };

  return (
    <>
      <LoadingOverlay open={loading} />
      <AppBar position="static" sx={{ background: "linear-gradient(to right, #bb268c, #f0768c)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", maxWidth: 1200, mx: "auto", width: "100%" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            sx={{ textDecoration: "none", color: "#fff", fontWeight: "bold" }}
          >
            MyShop
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>
            {user ? (
              <>
                {/* Make user's name clickable to go to ProfilePage */}
                <Button
                  sx={{ color: "#fff" }}
                  onClick={() => navigate("/profile")} // redirect to /profile route
                >
                  {user.name}
                </Button>

                <Button onClick={handleLogout} sx={{ color: "#fff" }}>
                  Logout
                </Button>

                <IconButton onClick={() => navigate("/cart")} sx={{ color: "#fff" }}>
                  <Badge badgeContent={totalItems} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </>
            ) : (
              <Button component={Link} to="/lp/login" sx={{ color: "#fff" }}>
                Login
              </Button>
            )}

          </Box>

          <IconButton sx={{ display: { xs: "block", md: "none" }, color: "#fff" }} onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          {user ? (
            <>
              <ListItem>{user.name}</ListItem>
              <ListItem button onClick={handleLogout}><ListItemText primary="Logout" /></ListItem>
              <ListItem button onClick={() => navigate("/cart")}><ListItemText primary={`Cart: ${totalItems} items`} /></ListItem>
            </>
          ) : (
            <ListItem button component={Link} to="/lp/login"><ListItemText primary="Login" /></ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}
