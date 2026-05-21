import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Layout from "./layouts/Layout";
import DashLayout from "./layouts/DashLayout";

import HomePage from "./pages/LandingPages/HomePage";
import AboutPage from "./pages/LandingPages/AboutPage";
import ArticleListPage from "./pages/LandingPages/ArticleListPage";

import SignInPage from "./pages/AuthPages/SignInPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";

import DashboardPage from "./pages/DashboardPages/DashboardPage";
import ReportsPage from "./pages/DashboardPages/ReportsPage";
import UsersPage from "./pages/DashboardPages/UsersPage";
import DashArticleListPage from "./pages/DashboardPages/DashArticleListPage";

import NotFoundPage from "./pages/NotFoundPage";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "articles", element: <ArticleListPage /> },
    ],
  },

  {
    path: "/signin",
    element: <SignInPage />,
  },

  {
    path: "/signup",
    element: <SignUpPage />,
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "articles",
        element: <DashArticleListPage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}