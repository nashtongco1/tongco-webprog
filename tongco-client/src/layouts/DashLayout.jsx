import * as React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Box,
  Button,
} from "@mui/material";

const drawerWidth = 220;

const DashLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Overview", to: "/dashboard" },
    { label: "Reports", to: "/dashboard/reports" },
    { label: "Users", to: "/dashboard/users" },
    { label: "Articles", to: "/dashboard/articles" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1201,
          background: "#c4b5fd",
          color: "black",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            LeKids Dashboard
          </Typography>

          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background:
              "linear-gradient(180deg, #7e22ce 0%, #a855f7 100%)",
            color: "white",
            borderRight: "none",
          },
        }}
      >
        <Toolbar />

        <List sx={{ px: 1.5, mt: 1 }}>
          {navItems.map((item) => {
            const active = location.pathname === item.to;

            return (
              <ListItemButton
                key={item.to}
                component={Link}
                to={item.to}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  background: active ? "#6d28d9" : "transparent",
                  color: "white",

                  "&:hover": {
                    background: "#7e22ce",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",

          background:
            "linear-gradient(135deg, #2e1065 0%, #581c87 50%, #6b21a8 100%)",

          color: "white",
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;