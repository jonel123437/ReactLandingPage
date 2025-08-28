import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Product', path: '/products' },
    { name: 'Support', path: '/support' },
    { name: 'Account', path: '/account' },
    { name: 'Login', path: '/login' }, // <-- Added Login link
  ];

  const cartPrice = 0;

  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(to right, #bb268c, #f0768c)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 1200, mx: 'auto', width: '100%' }}>
          
          {/* Logo */}
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>
            MyShop
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
            {links.map(link => (
              <Button
                key={link.name}
                component={Link}
                to={link.path}
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                {link.name}
              </Button>
            ))}

            {/* Cart */}
            <IconButton component={Link} to="/cart" sx={{ color: '#fff', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <Badge badgeContent={cartPrice} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            sx={{ display: { xs: 'block', md: 'none' }, color: '#fff' }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          {links.map(link => (
            <ListItem button key={link.name} component={Link} to={link.path} onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={link.name} />
            </ListItem>
          ))}

          {/* Cart in Drawer */}
          <ListItem button component={Link} to="/cart" onClick={() => setDrawerOpen(false)}>
            <ShoppingCartIcon sx={{ mr: 1 }} />
            <ListItemText primary={`Cart: $${cartPrice}`} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
