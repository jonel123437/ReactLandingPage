import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Cart', path: '/cart' },
    { name: 'Checkout', path: '/checkout' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(to right, #bb268c, #f0768c)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 1200, mx: 'auto', width: '100%' }}>
          
          {/* Logo */}
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>
            MyShop
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {links.map(link => (
              <Button key={link.name} component={Link} to={link.path} sx={{ color: '#fff' }}>
                {link.name}
              </Button>
            ))}
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
        </List>
      </Drawer>
    </>
  );
}
