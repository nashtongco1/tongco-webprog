import { Box, Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
        width: "100%",
        minHeight: "calc(100vh - 180px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 6,
        textAlign: "center",
      }}
    >
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" fontWeight="bold" color="white">
          Dashboard Overview
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.85)",
            mt: 1.5,
            fontSize: "1.1rem",
          }}
        >
          Welcome back. Here is a quick summary of your system activity.
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          flexWrap: "wrap",
        }}
      >
        {statCards.map((card, index) => (
          <Paper
            key={index}
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 5,
              color: card.textColor,
              background: card.background,
              height: 220,
              width: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "left",
              position: "relative",
              overflow: "hidden",
              transition: "0.3s ease",
              boxShadow: "0 18px 35px rgba(0,0,0,0.25)",

              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 24px 45px rgba(0,0,0,0.35)",
              },

              "&::after": {
                content: '""',
                position: "absolute",
                width: "130px",
                height: "130px",
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
        ))}
      </Box>

      <Paper
        elevation={6}
        sx={{
          mt: 6,
          width: "100%",
          maxWidth: "950px",
          borderRadius: 5,
          overflow: "hidden",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 18px 35px rgba(0,0,0,0.25)",
        }}
      >
        <Box
          sx={{
            p: 3,
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <LocationOnIcon sx={{ color: "#9333ea", fontSize: 34 }} />

          <Box>
            <Typography variant="h5" fontWeight="bold" color="#1f2937">
              Location Mapping
            </Typography>

            <Typography sx={{ color: "#6b7280", fontSize: "0.95rem" }}>
              Campus location overview for the system dashboard.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "380px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <iframe
            title="National University Manila Map"
            src="https://www.google.com/maps?q=National%20University%20Manila&output=embed"
            width="100%"
            height="100%"
            style={{
              border: 0,
              display: "block",
            }}
            loading="lazy"
            allowFullScreen
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardPage;