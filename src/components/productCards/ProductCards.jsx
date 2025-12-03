import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Grid,  } from "@mui/material";
import { Link } from "react-router-dom";

import categoryData from "../../data/productCards.json";
import AddNewProductModal from "./AddNewProductModal";

import {
  Carrot,
  Drumstick,
  Soup,
  CookingPot,
  Utensils,
  Sprout,
  
} from "lucide-react";
// IMPORT ALL CATEGORY JSON FILES (AUTO UPDATE COUNTS)
import nonvegData from "../../data/nonveg.json";
import vegetableData from "../../data/vegetable.json";
import powdersData from "../../data/powders.json";
import milletsData from "../../data/millets.json";
import readytoeatData from "../../data/readytoeat.json";
import organicData from "../../data/organic.json";

// ICON MAP
const iconMap = {
  carrot: <Carrot size={22} />,
  drumstick: <Drumstick size={22} />,
  soup: <Soup size={22} />,
  cookingpot: <CookingPot size={22} />,
  utensils: <Utensils size={22} />,
  sprout: <Sprout size={22} />,
  snack: <Utensils size={22} />,
  bowl: <Soup size={22} />,
  curry: <CookingPot size={22} />,
  spicy: <Sprout size={22} />,
  sweets: <Carrot size={22} />,
};

// Map slug → JSON data
const categoryMap = {
  nonveg: nonvegData,
  vegetable: vegetableData,
  powders: powdersData,
  millets: milletsData,
  readytoeat: readytoeatData,
  organic: organicData,
};

// Calculate total units dynamically
const getTotalUnits = (items = []) => {
  let total = 0;
  items.forEach((item) => {
    Object.values(item.weights).forEach((w) => {
      total += Number(w.units || 0);
    });
  });
  return total;
};

const LOCAL_KEY = "extraProducts_v1";

export default function ProductCards() {
  const initialProducts = useMemo(() => categoryData || [], []);
  const [customProducts, setCustomProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
   

  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCustomProducts(parsed);
      } catch {}
    }
  }, []);

  const persist = (items) => {
    setCustomProducts(items);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  };

  const handleAddProduct = (newProduct) => {
    const slugBase =
      newProduct.slug || newProduct.label.toLowerCase().replace(/\s+/g, "-");
    const product = {
      ...newProduct,
      id: Date.now(),
      slug: `${slugBase}-${Date.now()}`,
      isCustom: true,
    };

    const updated = [...customProducts, product];
    persist(updated);
     
  };

  

  return (
    <>
      <AddNewProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={handleAddProduct}
      />

      {/* DEFAULT PRODUCTS */}
      <Grid
        container
        spacing={2}
        sx={{
          mt: 2,
          px: 1,
          paddingInline: "20px",
          display: "flex",
          justifyContent: "flex-start",
        }}>
        {initialProducts.map((cat, i) => (
          <Grid item key={i} xs={12} sm={6} md={6} lg={2}>
            <Link
              to={`/category/${cat.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}>
              <Box
                sx={{
                  width: "170px",
                  minHeight: "140px",
                  background: cat.bg,
                  borderRadius: "18px",
                  padding: "18px",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.06)",
                  transition: "0.3s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0px 8px 30px rgba(0,0,0,0.12)",
                  },
                }}>
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
                    }}>
                    {iconMap[cat.icon]}
                  </Box>

                  {/* AUTO UPDATED COUNT */}
                  <Typography fontSize={35} fontWeight={700}>
                    {getTotalUnits(categoryMap[cat.slug]?.items)}
                  </Typography>
                </Box>

                <Typography sx={{ mt: 1 }} fontWeight={700}>
                  {cat.label}
                </Typography>

                <Typography sx={{ mt: 1, color: cat.color, fontWeight: 700 }}>
                  View →
                </Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>     
    </>
  );
}
