import { useState } from "react";

import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button,
  Paper,
  Chip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import usersData from "../../data/users.json";

export { usersData };

const UsersPage = () => {
  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("");

  const [genderFilter, setGenderFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "" || user.role === roleFilter;

    const matchesGender =
      genderFilter === "" || user.gender === genderFilter;

    const matchesStatus =
      statusFilter === "" || user.status === statusFilter;

    return (
      matchesSearch &&
      matchesRole &&
      matchesGender &&
      matchesStatus
    );
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },

    {
      field: "fullName",
      headerName: "Full Name",
      width: 180,
      valueGetter: (params) => {
        if (!params || !params.row) return "";
        return `${params.row.firstName} ${params.row.lastName}`;
      },
    },

    { field: "username", headerName: "Username", width: 150 },

    { field: "email", headerName: "Email", width: 220 },

    { field: "role", headerName: "Role", width: 120 },

    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Active" ? "success" : "default"}
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: "#9333ea", color: "white", "&:hover": { backgroundColor: "#7c3aed" } }}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: "#fde047", color: "black", "&:hover": { backgroundColor: "#facc15" } }}
          >
            Disable
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        color="white"
      >
        Users Management
      </Typography>


      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          mb: 3,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search User"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: 180 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              label="Role"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Viewer">Viewer</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              label="Gender"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{ height: "56px", backgroundColor: "#9333ea" }}
            >
              ADD USER
            </Button>
          </Grid>
        </Grid>
      </Paper>  



      <Paper
        sx={{
          height: 500,
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
        />
      </Paper>

    </Box>
  );
};

export default UsersPage;