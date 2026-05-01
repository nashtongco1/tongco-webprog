import * as React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Box,
} from "@mui/material";

const drawerWidth = 220;

const DashLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>

      {/* TOP NAVBAR (PURPLE-300) */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1201,
          backgroundColor: "#c4b5fd", // purple-300
          color: "black",
        }}
      >
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR (PURPLE-600 stays strong) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#9333ea", // purple-600
            color: "white",
          },
        }}
      >
        <Toolbar />

        <List>
          <ListItem component={Link} to="/dashboard" button>
            <ListItemText primary="Overview" />
          </ListItem>

          <ListItem component={Link} to="/reports" button>
            <ListItemText primary="Reports" />
          </ListItem>

          <ListItem component={Link} to="/users" button>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Drawer>

      {/* MAIN CONTENT (PURPLE-500 BACKGROUND) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#a855f7", // purple-500
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>

    </Box>
  );
};

export default DashLayout;