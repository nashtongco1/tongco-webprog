import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import DashLayout from "./layouts/DashLayout";

// LANDING
import HomePage from "./pages/LandingPages.jsx/HomePage";
import AboutPage from "./pages/LandingPages.jsx/AboutPage";
import ArticleListPage from "./pages/LandingPages.jsx/ArticleListPage";
import ArticlePage from "./pages/LandingPages.jsx/ArticlePage";

// AUTH
import SignInPage from "./pages/AuthPages/SignInPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";

// DASHBOARD
import DashboardPage from "./pages/DashboardPages/DashboardPage";
import ReportsPage from "./pages/DashboardPages/ReportsPage";
import UsersPage from "./pages/DashboardPages/UsersPage";

// OTHERS
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>

        {/* MAIN WEBSITE */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/articles" element={<ArticleListPage />} />
                <Route path="/articles/:name" element={<ArticlePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Routes>
            </Layout>
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <DashLayout>
              <DashboardPage />
            </DashLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <DashLayout>
              <ReportsPage />
            </DashLayout>
          }
        />

        <Route
          path="/users"
          element={
            <DashLayout>
              <UsersPage />
            </DashLayout>
          }
        />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}

export default App;