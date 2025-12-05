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
import ProfilePage from "./pages/ProfilePage";

import "./App.css";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // AGENTS STATE — moved INSIDE AuthProvider
  const [agents, setAgents] = useState(() => {
    const saved = localStorage.getItem("agents");
    return saved ? JSON.parse(saved) : [];
  });

  const addAgent = (newAgent) => {
    const updated = [...agents, newAgent];
    setAgents(updated);
    localStorage.setItem("agents", JSON.stringify(updated));
  };

  const login = (userData) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateUser = (newUserData) => {
    const updated = { ...user, ...newUserData };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    window.dispatchEvent(new Event("userUpdated"));
  };
  const updateAgent = (agentId, updatedData) => {
  const updated = agents.map((a) =>
    a.id === agentId ? { ...a, ...updatedData } : a
  );
  setAgents(updated);
  localStorage.setItem("agents", JSON.stringify(updated));
};

const deleteAgent = (id) => {
  const updated = agents.filter(a => a.id !== id);
  setAgents(updated);
  localStorage.setItem("agents", JSON.stringify(updated));
};

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "isLoggedIn") {
        setIsLoggedIn(e.newValue === "true");
      }
      if (e.key === "user") {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
      if (e.key === "agents") {
        setAgents(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        updateUser,
        agents,        
        addAgent,
        updateAgent,
  deleteAgent,     
      }}
    >
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
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<><ProductCards /><GraphsDashboardPage /></>} />
                <Route path="/category/:type" element={<StockCategoryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}