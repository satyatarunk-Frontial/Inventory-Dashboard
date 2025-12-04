import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import StockCategoryPage from "./pages/StockCategoryPage";
import GraphsDashboardPage from "./pages/GraphDashboardpage";
import Login from "./Auth/Login";

import React, { createContext, useEffect, useState, useContext } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// ----------------------
// Auth Context
// ----------------------
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const syncLoginState = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", syncLoginState);
    return () => window.removeEventListener("storage", syncLoginState);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// ----------------------
// Protected Route
// ----------------------
function ProtectedRoute() {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

// ----------------------
// MUI Theme
// ----------------------
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


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Login Page (No Navbar) */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes (With Navbar) */}
          <Route element={<ProtectedRoute />}>
            <Route
              element={
                <>
                  <Navbar />
                  <Outlet />
                </>
              }
            >
              <Route path="/dashboard" element={<GraphsDashboardPage />} />
              <Route path="/stocks" element={<StockCategoryPage />} />
            </Route>
          </Route>

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
