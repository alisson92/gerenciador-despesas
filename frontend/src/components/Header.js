import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout'; // Certifique-se de que esta linha está presente

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-primary p-3 text-white" style={{ position: 'relative', textAlign: 'center' }}>
      <IconButton
        onClick={toggleDrawer}
        style={{ position: 'absolute', left: '10px', top: '10px', width: '60px', height: '60px', color: 'white' }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <h1 style={{ display: 'inline' }}>Gerenciador de Despesas</h1>
      <Button
        variant="contained"
        style={{ position: 'absolute', right: '10px', top: '10px', width: '80px', height: '40px', backgroundColor: 'white', color: 'black', fontWeight: 'bold' }} 
        onClick={handleLogout}
      >
        <LogoutIcon /> Sair
      </Button>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/relatorios">
            <ListItemText primary="Relatórios" />
          </ListItem>
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Drawer>
    </header>
  );
};

export default Header;
