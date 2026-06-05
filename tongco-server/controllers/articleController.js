const Article = require("../models/Article");

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: 1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get articles",
      error: error.message,
    });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const { slug, title, description, image, content } = req.body;

    if (!slug || !title || !description) {
      return res.status(400).json({
        message: "Slug, title, and description are required",
      });
    }

    const existingArticle = await Article.findOne({ slug });

    if (existingArticle) {
      return res.status(400).json({
        message: "Article slug already exists",
      });
    }

    const article = await Article.create({
      slug,
      title,
      description,
      image: image || "",
      content: Array.isArray(content) ? content : [],
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create article",
      error: error.message,
    });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { slug, title, description, image, content } = req.body;

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        slug,
        title,
        description,
        image: image || "",
        content: Array.isArray(content) ? content : [],
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update article",
      error: error.message,
    });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete article",
      error: error.message,
    });
  }
};