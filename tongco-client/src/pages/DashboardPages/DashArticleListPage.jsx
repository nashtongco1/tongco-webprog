import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Avatar,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import articles from "../../data/article-content";

const DashArticleListPage = () => {
  const formattedArticles = articles.map((article, index) => ({
    id: index + 1,
    name: article.name || article.slug || `article-${index + 1}`,
    title: article.title || "Untitled Article",
    description: article.description || "No description available",
    image: article.image || "",
    paragraphs: article.paragraphs || article.content || [],
  }));

  const [articleList, setArticleList] = useState(formattedArticles);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    description: "",
    image: "",
  });

  const filteredArticles = articleList.filter((article) => {
    return (
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase()) ||
      article.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const paginatedArticles = filteredArticles.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const resetForm = () => {
    setFormData({
      title: "",
      name: "",
      description: "",
      image: "",
    });
    setEditId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setOpenDialog(true);
  };

  const handleOpenEdit = (article) => {
    setEditId(article.id);
    setFormData({
      title: article.title,
      name: article.name,
      description: article.description,
      image: article.image,
    });
    setOpenDialog(true);
  };

  const handleSaveArticle = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please enter article title and description.");
      return;
    }

    const generatedSlug =
      formData.name.trim() ||
      formData.title.toLowerCase().trim().replaceAll(" ", "-");

    if (editId) {
      setArticleList((prev) =>
        prev.map((article) =>
          article.id === editId
            ? {
                ...article,
                title: formData.title,
                name: generatedSlug,
                description: formData.description,
                image: formData.image,
              }
            : article
        )
      );
    } else {
      const newArticle = {
        id: articleList.length + 1,
        name: generatedSlug,
        title: formData.title,
        description: formData.description,
        image: formData.image,
        paragraphs: [],
      };

      setArticleList((prev) => [...prev, newArticle]);

      const lastPage = Math.floor(articleList.length / rowsPerPage);
      setPage(lastPage);
    }

    setOpenDialog(false);
    resetForm();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (confirmDelete) {
      setArticleList((prev) =>
        prev
          .filter((article) => article.id !== id)
          .map((article, index) => ({
            ...article,
            id: index + 1,
          }))
      );
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    }
  };

  const getPreview = (article) => {
    return article.description.length > 55
      ? `${article.description.substring(0, 55)}...`
      : article.description;
  };

  return (
    <Box sx={{ p: 4, background: "#f6f7fb", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="600" sx={{ color: "#1f2937" }}>
          Articles
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{
            background: "#1976d2",
            fontWeight: "bold",
            px: 2.5,
            height: 40,
            boxShadow: "none",
            "&:hover": {
              background: "#1565c0",
              boxShadow: "none",
            },
          }}
        >
          Add Article
        </Button>
      </Box>

      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          background: "#ffffff",
          border: "1px solid #e5e7eb",
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search Articles"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#9ca3af" }} />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Paper
        elevation={1}
        sx={{
          borderRadius: 2,
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ minHeight: 330 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#f9fafb" }}>
                <TableCell sx={{ fontWeight: "bold", color: "#6b7280" }}>
                  ID
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#6b7280" }}>
                  Image
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#6b7280" }}>
                  Slug
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#6b7280" }}>
                  Title
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#6b7280" }}>
                  Preview
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#6b7280" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedArticles.length > 0 ? (
                paginatedArticles.map((article) => (
                  <TableRow key={article.id} hover>
                    <TableCell>{article.id}</TableCell>

                    <TableCell>
                      <Avatar
                        src={article.image}
                        variant="rounded"
                        sx={{
                          width: 70,
                          height: 50,
                          background: "#e5e7eb",
                        }}
                      >
                        No Img
                      </Avatar>
                    </TableCell>

                    <TableCell>{article.name}</TableCell>

                    <TableCell sx={{ fontWeight: "600", color: "#111827" }}>
                      {article.title}
                    </TableCell>

                    <TableCell sx={{ maxWidth: 330, color: "#6b7280" }}>
                      {getPreview(article)}
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenEdit(article)}
                          sx={{ fontWeight: "bold" }}
                        >
                          Edit
                        </Button>

                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(article.id)}
                          sx={{
                            fontWeight: "bold",
                            boxShadow: "none",
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    No articles found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredArticles.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(Number(event.target.value));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle fontWeight="bold">
          {editId ? "Edit Article" : "Add Article"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Article Title"
              fullWidth
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />

            <TextField
              label="Slug"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            <TextField
              label="Image URL"
              fullWidth
              value={formData.image}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
            />

            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>

            {formData.image && (
              <Box
                component="img"
                src={formData.image}
                alt="Article Preview"
                sx={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 2,
                  border: "1px solid #e5e7eb",
                }}
              />
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleSaveArticle}>
            {editId ? "Save Changes" : "Add Article"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;