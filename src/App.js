// src/App.js
import React, { useState, createContext, useContext, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import SideBar, { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED } from "./components/sideBar/SideBar";
import Navbar, { NAVBAR_HEIGHT } from "./components/navbar/Navbar";
import ProductCards from "./components/productCards/ProductCards";
import GraphsDashboardPage from "./pages/GraphDashboardpage";
import StockCategoryPage from "./pages/StockCategoryPage";
import Foot from "./components/footer/Foot";
import Login from "./Auth/Login";
import "./App.css";

// AUTH CONTEXT
export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const login = (userData = null) => {
    localStorage.setItem("isLoggedIn", "true");
    if (userData) localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  // Sync across tabs
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "isLoggedIn") {
        setIsLoggedIn(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProtectedRoute() {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const marginLeft = sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED;

  return (
    <>
      <SideBar initialOpen={sidebarOpen} onToggle={setSidebarOpen} />
      <div
        style={{
          marginLeft,
          transition: "margin-left 180ms linear",
          minHeight: "100vh",
          paddingTop: NAVBAR_HEIGHT,
          background: "var(--app-bg, #f6fbfb)",
        }}
      >
        <Navbar />
        <main style={{ maxWidth: 1560, margin: "0 auto", padding: "24px 22px" }}>
          <Outlet />
        </main>
        <Foot />
      </div>
    </>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: { fontFamily: "Alata, sans-serif" },
    h2: { fontFamily: "Alata, sans-serif" },
    h3: { fontFamily: "Alata, sans-serif" },
    h4: { fontFamily: "Alata, sans-serif" },
    h5: { fontFamily: "Alata, sans-serif" },
    h6: { fontFamily: "Alata, sans-serif" },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route
                  path="/"
                  element={
                    <>
                      <ProductCards />
                      <GraphsDashboardPage />
                    </>
                  }
                />
                <Route path="/category/:type" element={<StockCategoryPage />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}