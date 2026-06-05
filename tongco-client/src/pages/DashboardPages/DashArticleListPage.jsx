import { useEffect, useState } from "react";
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

import defaultArticles from "../../data/article-content";

const API_URL = "http://localhost:8000/api/articles";

const DashArticleListPage = () => {
  const [articleList, setArticleList] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    description: "",
    image: "",
  });

  const formatArticles = (data) =>
    data.map((article, index) => ({
      id: article._id,
      displayId: index + 1,
      name: article.slug,
      title: article.title,
      description: article.description,
      image: article.image || "",
      content: article.content || [],
    }));

  const seedDefaultArticles = async () => {
    for (const article of defaultArticles) {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: article.name,
          title: article.title,
          description: article.description,
          image: article.image,
          content: article.content || [],
        }),
      });
    }
  };

  const loadArticles = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load articles");
      }

      if (data.length === 0) {
        await seedDefaultArticles();

        const seededResponse = await fetch(API_URL);
        const seededData = await seededResponse.json();

        setArticleList(formatArticles(seededData));
      } else {
        setArticleList(formatArticles(data));
      }
    } catch (error) {
      console.error("Load articles error:", error);
      alert("Failed to load articles from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

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

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
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

  const handleSaveArticle = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please enter article title and description.");
      return;
    }

    const generatedSlug = formData.name.trim()
      ? generateSlug(formData.name)
      : generateSlug(formData.title);

    const articleData = {
      slug: generatedSlug,
      title: formData.title.trim(),
      description: formData.description.trim(),
      image: formData.image,
      content: [formData.description.trim()],
    };

    try {
      if (editId) {
        const response = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(articleData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to update article");
        }

        alert("Article updated successfully.");
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(articleData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to create article");
        }

        alert("Article added successfully.");
      }

      setOpenDialog(false);
      resetForm();
      await loadArticles();
    } catch (error) {
      console.error("Save article error:", error);
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete article");
      }

      alert("Article deleted successfully.");
      await loadArticles();
    } catch (error) {
      console.error("Delete article error:", error);
      alert(error.message);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
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
        >
          Add Article
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
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
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Paper>
        <TableContainer sx={{ minHeight: 330 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Preview</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedArticles.length > 0 ? (
                paginatedArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>{article.displayId}</TableCell>

                    <TableCell>
                      <Avatar
                        src={article.image}
                        variant="rounded"
                        sx={{ width: 70, height: 50 }}
                      >
                        No Img
                      </Avatar>
                    </TableCell>

                    <TableCell>{article.name}</TableCell>

                    <TableCell sx={{ fontWeight: "bold" }}>
                      {article.title}
                    </TableCell>

                    <TableCell>{getPreview(article)}</TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenEdit(article)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(article.id)}
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
                    {loading ? "Loading articles..." : "No articles found."}
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
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />

            <TextField
              label="Slug"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
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
              label="Image URL or Uploaded Image"
              fullWidth
              value={
                formData.image.startsWith("data:image")
                  ? "Uploaded image selected"
                  : formData.image
              }
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, image: e.target.value }))
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