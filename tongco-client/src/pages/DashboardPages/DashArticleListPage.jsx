import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Card,
  CardMedia,
} from "@mui/material";

import articles from "../../data/article-content";

const DashArticleListPage = () => {
  const [search, setSearch] = useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 4, background: "#f6f7fb", minHeight: "100vh" }}>
      {/* HEADER */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 3, color: "#111827" }}
      >
        Dashboard Articles
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 5,
          borderRadius: 3,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          size="small"
          label="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{
            background: "#111827",
            px: 4,
            height: "40px",
            "&:hover": { background: "#000" },
          }}
        >
          Search
        </Button>
      </Paper>

      <Grid container spacing={4}>
        {filteredArticles.map((article) => (
          <Grid item xs={12} key={article.name}>
            <Card
              elevation={0}
              sx={{
                display: "flex",
                borderRadius: 0,
                background: "transparent",
                borderBottom: "1px solid #e5e7eb",
                pb: 3,
                pt: 2,
              }}
            >
              <Box sx={{ flex: 1, maxWidth: 260 }}>
                <CardMedia
                  component="img"
                  image={article.image}
                  alt={article.title}
                  sx={{
                    width: "100%",
                    height: 160,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              </Box>

              <Box
                sx={{
                  flex: 2,
                  pl: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#111827" }}
                >
                  {article.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: "#6b7280",
                    maxWidth: "80%",
                  }}
                >
                  {article.description}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ mt: 2, color: "#9ca3af" }}
                >
                  Read article • View details • Updated recently
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashArticleListPage;