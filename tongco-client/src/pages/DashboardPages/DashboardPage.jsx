import { Box, Grid, Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import usersData from "../../data/users.json";

const DashboardPage = () => {
  const totalUsers = usersData.length;

  const statCards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <PeopleIcon sx={{ fontSize: 46 }} />,
      background: "linear-gradient(135deg, #9333ea, #7e22ce)",
      textColor: "white",
    },
    {
      title: "Reports",
      value: 75,
      icon: <AssessmentIcon sx={{ fontSize: 46 }} />,
      background: "linear-gradient(135deg, #fde047, #facc15)",
      textColor: "black",
    },
    {
      title: "Visits",
      value: "1,240",
      icon: <VisibilityIcon sx={{ fontSize: 46 }} />,
      background: "linear-gradient(135deg, #a855f7, #9333ea)",
      textColor: "white",
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: "1100px",
        mx: "auto",
        px: 2,
        py: 4,
        minHeight: "100vh",
      }}
    >
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" fontWeight="bold" color="white">
          Dashboard Overview
        </Typography>

        <Typography sx={{ color: "rgba(255,255,255,0.75)", mt: 1 }}>
          Welcome back. Here is a quick summary of your system activity.
        </Typography>
      </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 5,
                color: card.textColor,
                background: card.background,
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transition: "0.3s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 12,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  right: "-35px",
                  bottom: "-35px",
                  background: "rgba(255,255,255,0.18)",
                },
              }}
            >
              <Box sx={{ mb: 2, zIndex: 1 }}>{card.icon}</Box>

              <Typography variant="body1" fontWeight="bold" sx={{ zIndex: 1 }}>
                {card.title}
              </Typography>

              <Typography variant="h3" fontWeight="bold" sx={{ zIndex: 1 }}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardPage;