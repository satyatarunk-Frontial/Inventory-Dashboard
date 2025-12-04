import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SideBar, { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED } from "./components/sideBar/SideBar";
import Navbar, { NAVBAR_HEIGHT } from "./components/navbar/Navbar";
import ProductCards from "./components/productCards/ProductCards";
import GraphsDashboardPage from "./pages/GraphDashboardpage";
import StockCategoryPage from "./pages/StockCategoryPage";
import Foot from "./components/footer/Foot";
import "./App.css";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const contentMarginLeft = sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SideBar initialOpen={sidebarOpen} onToggle={(v) => setSidebarOpen(v)} />
        <div
          style={{
            marginLeft: contentMarginLeft,
            transition: "margin-left 180ms linear",
            minHeight: "100vh",
            paddingTop: NAVBAR_HEIGHT,
            boxSizing: "border-box",
            background: "var(--app-bg, #f6fbfb)",
          }}
        >
          <Navbar />

          <main
            style={{
              width: "100%",
              maxWidth: 1560,
              margin: "0 auto",
              paddingTop: "24px",
              paddingLeft:"22px",
              boxSizing: "border-box",
            }}
          >
            <Routes>
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
            </Routes>
          </main>

          <Foot />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
