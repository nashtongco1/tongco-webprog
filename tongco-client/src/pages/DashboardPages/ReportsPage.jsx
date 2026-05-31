import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

/* IMPORT USERS DATA */
import usersData from "../../data/users.json";

const ReportsPage = () => {

  const handlePrint = () => {
    window.print();
  };

  const totalUsers = usersData.length;

  const activeUsers = usersData.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = usersData.filter(
    (user) => user.status === "Inactive"
  ).length;

  const admins = usersData.filter(
    (user) => user.role === "Admin"
  ).length;

  const viewers = usersData.filter(
    (user) => user.role === "Viewer"
  ).length;

  const editors = usersData.filter(
    (user) => user.role === "Editor"
  ).length;

  return (
    <Box>

      <Box
        sx={{
          position: "relative",
          mb: 4,
          minHeight: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="white"
          textAlign="center"
        >
          Reports Summary
        </Typography>

        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handlePrint}
          sx={{
            position: "absolute",
            right: 0,
            backgroundColor: "#fde047",
            color: "black",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#facc15",
            },
          }}
        >
          PRINT REPORT
        </Button>
      </Box>

      {/* CENTERED CARDS */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ mb: 4 }}
      >

        <Grid item>
          <Paper
            sx={{
              p: 3,
              width: 230,
              borderRadius: 4,
              backgroundColor: "#9333ea",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">
              Total Users
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              {totalUsers}
            </Typography>
          </Paper>
        </Grid>

        <Grid item>
          <Paper
            sx={{
              p: 3,
              width: 230,
              borderRadius: 4,
              backgroundColor: "#22c55e",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">
              Active Users
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              {activeUsers}
            </Typography>
          </Paper>
        </Grid>

        <Grid item>
          <Paper
            sx={{
              p: 3,
              width: 230,
              borderRadius: 4,
              backgroundColor: "#ef4444",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">
              Inactive Users
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              {inactiveUsers}
            </Typography>
          </Paper>
        </Grid>

      </Grid>

      <Grid container spacing={3}>

        {/* BAR CHART */}

        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Typography variant="h6" mb={2}>
              User Status Overview
            </Typography>

            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Users"],
                },
              ]}
              series={[
                {
                  data: [activeUsers],
                  label: "Active Users",
                  color: "#22c55e",
                },
                {
                  data: [inactiveUsers],
                  label: "Inactive Users",
                  color: "#ef4444",
                },
              ]}
              width={500}
              height={300}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Typography variant="h6" mb={2}>
              User Roles Distribution
            </Typography>

            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.value}`,
                  arcLabelMinAngle: 35,
                  data: [
                    {
                      id: 0,
                      value: admins,
                      label: "Admins",
                      color: "#9333ea",
                    },
                    {
                      id: 1,
                      value: viewers,
                      label: "Viewers",
                      color: "#22c55e",
                    },
                    {
                      id: 2,
                      value: editors,
                      label: "Editors",
                      color: "#f97316",
                    },
                  ],
                },
              ]}
              width={400}
              height={300}
            />
          </Paper>
        </Grid>

      </Grid>

    </Box>
  );
};

export default ReportsPage;