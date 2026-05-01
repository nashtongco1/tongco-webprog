import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

export const usersData = [
  { id: 1, name: "LeBron James", age: 38 },
  { id: 2, name: "Michael Jordan", age: 60 },
  { id: 3, name: "Kobe Bryant", age: 41 },
  { id: 4, name: "Kevin Durant", age: 35 },
  { id: 5, name: "Klay Thompson", age: 34 },
  { id: 6, name: "Stephen Curry", age: 36 },
  { id: 7, name: "Hakeem Olajuwon", age: 61 },
  { id: 8, name: "Kawhi Leonard", age: 33 },
];

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Full Name", width: 200 },
  { field: "age", headerName: "Age", width: 110 },
];

const UsersPage = () => {
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Users List
      </Typography>

      <Box
        sx={{
          height: 420,
          width: "100%",
          bgcolor: "#fde047",
          borderRadius: 2,
          p: 2,
        }}
      >
        <DataGrid
          rows={usersData}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
        />
      </Box>
    </Box>
  );
};

export default UsersPage; 