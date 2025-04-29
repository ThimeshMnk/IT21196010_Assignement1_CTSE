import React from 'react';
import SideNav from './SideNav';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,   background: 'linear-gradient(to right,rgb(2, 25, 38),rgb(203, 219, 227))', minHeight : "100vh"}}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
