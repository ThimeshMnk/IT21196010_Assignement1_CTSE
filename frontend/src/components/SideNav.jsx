import React from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Box, Divider, useTheme
} from '@mui/material';
import {
  Dashboard, Hotel, CalendarMonth, People, Logout, Book,
  CarRental,CarRepairOutlined
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const SideNav = () => {
  const nav = useNavigate();
  const loc = useLocation();
  const role = localStorage.getItem('userType');

  const items  = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard', role:['admin'] },
    { text: 'Car List', icon: <Hotel />, path: '/car-list', role:['customer']  },
    {text :'My Rentals' , icon: <CarRepairOutlined/>, path: '/my-rentals', role:['customer']},
    // { text: 'Room Reservations', icon: <CalendarMonth />, path: '/reservations' },
    // { text: 'Reserved Rooms', icon: <Book />, path: '/reserved-rooms' },
    { text: 'User Management', icon: <People />, path: '/users', role:['admin'] },
    {text :'Car Rentals' , icon: <CarRental/>, path: '/manage-rentals', role:['admin']}
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1E293B', // dark slate color
          color: 'white',
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <List>
        {items.filter(i=>i.role.includes(role)).map(i=>{
          const active = loc.pathname===i.path || (i.dynamic && loc.pathname.startsWith(i.path));
          return (
              <ListItem
                button
                key={i.text}
                onClick={()=>nav(i.dynamic? i.path : i.path)}
                sx={{
                  backgroundColor: isActive ? '#334155' : 'inherit',
                  '&:hover': { backgroundColor: '#475569' },
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>{i.icon}</ListItemIcon>
                <ListItemText primary={i.text} />
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ backgroundColor: '#64748B' }} />

      <Box>
        <List>
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              '&:hover': { backgroundColor: '#EF4444' },
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideNav;
