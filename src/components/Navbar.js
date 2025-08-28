import {
  AppBar, Toolbar, Typography, Button, Box,
  IconButton, Drawer, List, ListItem, ListItemText,
  Badge, Menu, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay'; // make sure this exists in components/

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // for dropdown menu
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate();

  const cartPrice = 0;

  // On mount, check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setLoading(true); // show loading overlay
    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setAnchorEl(null);
      setLoading(false); // hide loading overlay
      navigate("/");
    }, 200); // 0.2s delay
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Product', path: '/products' },
    { name: 'Support', path: '/support' },
    !user && { name: 'Login', path: '/login' }, // show login if not logged in
  ].filter(Boolean);

  return (
    <>
      <LoadingOverlay open={loading} />

      <AppBar position="static" sx={{ background: 'linear-gradient(to right, #bb268c, #f0768c)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 1200, mx: 'auto', width: '100%' }}>
          
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>
            MyShop
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
            {links.map(link => (
              <Button
                key={link.name}
                component={Link}
                to={link.path}
                sx={{ color: '#fff', textTransform: 'none', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                {link.name}
              </Button>
            ))}

            {user && (
              <>
                <Button
                  sx={{ color: '#fff', textTransform: 'none' }}
                  onClick={handleUserClick}
                >
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}

            <IconButton component={Link} to="/cart" sx={{ color: '#fff', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <Badge badgeContent={cartPrice} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>

          <IconButton sx={{ display: { xs: 'block', md: 'none' }, color: '#fff' }} onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          {links.map(link => (
            <ListItem button key={link.name} component={Link} to={link.path} onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={link.name} />
            </ListItem>
          ))}

          {user && (
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          )}

          <ListItem button component={Link} to="/cart" onClick={() => setDrawerOpen(false)}>
            <ShoppingCartIcon sx={{ mr: 1 }} />
            <ListItemText primary={`Cart: $${cartPrice}`} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
