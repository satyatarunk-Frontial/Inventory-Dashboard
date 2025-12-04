// src/components/productCards/ProductCards.jsx
import React, { useEffect, useState,useContext } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";

import categoryData from "../../data/productCards.json";
import AddNewProductModal from "./AddNewProductModal";

import {
  Carrot,
  Drumstick,
  Soup,
  CookingPot,
  Utensils,
  Sprout,
  Gem,
  Cookie,
  Sparkles,
} from "lucide-react";

// EXISTING CATEGORY DATA
import nonvegData from "../../data/nonveg.json";
import vegetableData from "../../data/vegetable.json";
import powdersData from "../../data/powders.json";
import milletsData from "../../data/millets.json";
import readytoeatData from "../../data/readytoeat.json";
import organicData from "../../data/organic.json";

// NEW SWEETS CATEGORIES
import dryfruitLadduData from "../../data/dryfruit-laddufevi.json";
import ragiBiscuitsData from "../../data/ragi-biscuitsfevi.json";
import milletSweetsData from "../../data/millet-sweetsfevi.json";

// ICON MAP
const iconMap = {
  carrot: <Carrot size={22} />,
  drumstick: <Drumstick size={22} />,
  soup: <Soup size={22} />,
  cookingpot: <CookingPot size={22} />,
  utensils: <Utensils size={22} />,
  sprout: <Sprout size={22} />,
  gem: <Gem size={22} />,
  cookie: <Cookie size={22} />,
  sparkles: <Sparkles size={22} />,
};

// CATEGORY MAP
const categoryMap = {
  nonveg: nonvegData,
  vegetable: vegetableData,
  powders: powdersData,
  millets: milletsData,
  readytoeat: readytoeatData,
  organic: organicData,
  "dryfruit-laddu": dryfruitLadduData,
  "ragi-biscuits": ragiBiscuitsData,
  "millet-sweets": milletSweetsData,
};

// Get total units
const getTotalUnits = (items = []) => {
  if (!items || !Array.isArray(items)) return 0;
  let total = 0;
  items.forEach((item) => {
    if (item.weights && Array.isArray(item.weights)) {
      item.weights.forEach((w) => {
        total += Number(w.units || 0);
      });
    }
  });
  return total;
};

const LOCAL_KEY = "extraProducts_v1";

export default function ProductCards() {
  const { isLoggedIn } = useContext(AuthContext);
  const [customProducts, setCustomProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // Get current user brand
  const storedUser = localStorage.getItem("user");
const currentUser = storedUser ? JSON.parse(storedUser) : null;
const userBrand = currentUser?.brandText || "Pickles";

  // Filter categories based on brand
 const visibleCards = categoryData.filter(card => card.brand === userBrand);

  // Load custom products
  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCustomProducts(parsed);
      } catch (e) {
        console.error("Failed to load custom products", e);
      }
    }
  }, []);

  const handleAddProduct = (newProduct) => {
    const slugBase = newProduct.slug || newProduct.label.toLowerCase().replace(/\s+/g, "-");
    const product = {
      ...newProduct,
      id: Date.now(),
      slug: `${slugBase}-${Date.now()}`,
      isCustom: true,
    };
    const updated = [...customProducts, product];
    setCustomProducts(updated);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  };

  return (
    <>
      <AddNewProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={handleAddProduct}
      />

      <Grid
        container
        spacing={2}
        sx={{
          mt: 2,
          px: 1,
          paddingInline: "20px",
          display: "flex",
          justifyContent: "flex-start",
          ml: "15px",
        }}
      >
{visibleCards.map((cat, i) => {
            const totalUnits = getTotalUnits(categoryMap[cat.slug]?.items);

          return (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Link
                to={`/category/${cat.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  sx={{
                    width: "170px",
                    minHeight: "140px",
                    background: cat.bg,
                    borderRadius: "18px",
                    padding: "18px",
                    boxShadow: "0px 4px 20px rgba(0,0,0,0.06)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 12px 35px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        background: `${cat.color}22`,
                        color: cat.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {iconMap[cat.icon]}
                    </Box>

                    <Typography fontSize={35} fontWeight={700} color={cat.text || cat.color}>
                      {totalUnits > 0 ? totalUnits : "0"}
                    </Typography>
                  </Box>

                  <Typography sx={{ mt: 1.5 }} fontWeight={700} fontSize="0.95rem">
                    {cat.label}
                  </Typography>

                  <Typography
                    sx={{ mt: 1, color: cat.color, fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    View →
                  </Typography>
                </Box>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}