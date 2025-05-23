import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Dashboard,
  Logout,
  CarRental,
  CarRepairOutlined,
  People
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Car List", icon: <CarRental />, path: "/car-list" },
    { text: "My Rentals", icon: <CarRepairOutlined />, path: "/my-rentals" },
    // { text: 'Room Reservations', icon: <CalendarMonth />, path: '/reservations' },
    // { text: 'Reserved Rooms', icon: <Book />, path: '/reserved-rooms' },
    { text: "User Management", icon: <People />, path: "/users" },
    { text: "Manage Rentals", icon: <CarRental />, path: "/manage-rentals" },
    { text: "Car Management", icon: <CarRental />, path: "/manage-cars" },
    
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1E293B", // dark slate color
          color: "white",
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <List>
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  backgroundColor: isActive ? "#334155" : "inherit",
                  "&:hover": { backgroundColor: "#475569" },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ backgroundColor: "#64748B" }} />

      <Box>
        <List>
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              "&:hover": { backgroundColor: "#EF4444" },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideNav;
