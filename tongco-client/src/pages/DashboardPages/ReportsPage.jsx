import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Typography, Paper } from "@mui/material";

const ReportsPage = () => {
  return (
    <Box>

      <Typography variant="h5" mb={2} color="white">
        Reports Overview
      </Typography>

      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <LineChart
          xAxis={[
            {
              data: [1, 2, 3, 4, 5, 6],
              label: "Time",
            },
          ]}
          series={[
            {
              data: [2, 5, 3, 8, 7, 6],
              label: "User Growth",
              color: "#f97316",
            },
            {
              data: [1, 3, 4, 6, 5, 9],
              label: "Report Activity",
              color: "#22c55e",
            },
          ]}
          width={700}
          height={350}
        />
      </Paper>

    </Box>
  );
};

export default ReportsPage;