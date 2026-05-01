import { Box, Grid, Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { usersData } from "./UsersPage"; // CONNECTED

const DashboardPage = () => {
  const totalUsers = usersData.length;

  return (
    <Box
      sx={{
        maxWidth: "1100px",
        mx: "auto",
        px: 2,
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <Box sx={{ mt: 2, mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" color="white">
          Dashboard Overview
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "rgba(255,255,255,0.8)", mt: 1 }}
        >
          Summary of system activity and performance
        </Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={3} justifyContent="center">

          <Grid item xs={12} md={4}>
            <Paper
              elevation={5}
              sx={{
                p: 3,
                borderRadius: 4,
                textAlign: "center",
                color: "white",
                background: "linear-gradient(135deg, #9333ea, #7e22ce)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 10,
                },
              }}
            >
              <PeopleIcon sx={{ fontSize: 42, mb: 1 }} />
              <Typography variant="h6">Users</Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalUsers}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={5}
              sx={{
                p: 3,
                borderRadius: 4,
                textAlign: "center",
                color: "black",
                background: "linear-gradient(135deg, #fde047, #facc15)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 10,
                },
              }}
            >
              <AssessmentIcon sx={{ fontSize: 42, mb: 1 }} />
              <Typography variant="h6">Reports</Typography>
              <Typography variant="h4" fontWeight="bold">
                75
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={5}
              sx={{
                p: 3,
                borderRadius: 4,
                textAlign: "center",
                color: "white",
                background: "linear-gradient(135deg, #a855f7, #9333ea)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 10,
                },
              }}
            >
              <VisibilityIcon sx={{ fontSize: 42, mb: 1 }} />
              <Typography variant="h6">Visits</Typography>
              <Typography variant="h4" fontWeight="bold">
                1,240
              </Typography>
            </Paper>
          </Grid>

        </Grid>
      </Box>

    </Box>
  );
};

export default DashboardPage;