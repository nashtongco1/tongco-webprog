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

  const userType = localStorage.getItem("type");

  const navItems = [
    { label: "Overview", to: "/dashboard", roles: ["admin", "editor"] },
    { label: "Reports", to: "/dashboard/reports", roles: ["admin", "editor"] },
    { label: "Users", to: "/dashboard/users", roles: ["admin"] },
    { label: "Articles", to: "/dashboard/articles", roles: ["admin", "editor"] },
  ];

  const allowedNavItems = navItems.filter((item) =>
    item.roles.includes(userType)
  );

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

          <Button variant="contained" color="error" onClick={handleLogout}>
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
          {allowedNavItems.map((item) => {
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
          p: 4,
          minHeight: "100vh",

          background:
            "linear-gradient(135deg, #7e22ce 0%, #9333ea 35%, #a855f7 70%, #c084fc 100%)",

          position: "relative",
          overflow: "hidden",

          "&::before": {
            content: '""',
            position: "fixed",
            top: "-100px",
            left: "-100px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            filter: "blur(80px)",
            pointerEvents: "none",
          },

          "&::after": {
            content: '""',
            position: "fixed",
            bottom: "-100px",
            right: "-100px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            filter: "blur(100px)",
            pointerEvents: "none",
          },
        }}
      >
        <Toolbar />

        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashLayout;