// src/pages/GraphDashboardpage.jsx
import React, { useState } from "react";
import { Box, Grid } from "@mui/material";

import GraphsHeader from "../components/graphs/GraphsHeader";
import CategoryTrendGraph from "../components/graphs/CategoryTrendGraph";
import SalesLineGraph from "../components/graphs/SalesLineGraph";
import PieChartGraph from "../components/graphs/PieChartGraph";
import StockSpeedometerGraph from "../components/graphs/SpeedometerGraph";
import StockVsSalesBarChart from "../components/graphs/StockVsSalesGraph";

import { mergeAllCategories, filterItemsByCategory } from "../components/graphs/graphUtils";

// EXISTING CATEGORIES
import nonveg from "../data/nonveg.json";
import vegetable from "../data/vegetable.json";
import powders from "../data/powders.json";
import millets from "../data/millets.json";
import readytoeat from "../data/readytoeat.json";
import organic from "../data/organic.json";

// NEW SWEETS CATEGORIES — JUST ADDED HERE
import dryfruitLaddu from "../data/dryfruit-laddufevi.json";
import ragiBiscuits from "../data/ragi-biscuitsfevi.json";
import milletSweets from "../data/millet-sweetsfevi.json";

export default function GraphDashboardpage() {
  // FULL MERGED DATASET — NOW INCLUDES YOUR 3 NEW SWEETS CATEGORIES
  const allItems = mergeAllCategories(
    vegetable,
    nonveg,
    powders,
    millets,
    readytoeat,
    organic,
    dryfruitLaddu,     // Added
    ragiBiscuits,      // Added
    milletSweets       // Added
  );

  const [globalCategory, setGlobalCategory] = useState("all");
  const [date, setDate] = useState("");

  // Filtered items based on selected category (works for new ones too!)
  const filteredItems = filterItemsByCategory(allItems, globalCategory);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        pb: 10,
        px: { xs: 2, md: 4 },
        background:
          "linear-gradient(180deg, #f9fafb 0%, #eef2ff 35%, #e0f2fe 100%)",
      }}
    >
      <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
        <GraphsHeader
          allItems={allItems}
          items={filteredItems}
          category={globalCategory}
          setCategory={setGlobalCategory}
          date={date}
          setDate={setDate}
        />

        {/* ALL GRAPHS NOW INCLUDE YOUR NEW SWEETS DATA */}
        <Box sx={{ mb: 4, mt: 3 }}>
          <CategoryTrendGraph items={filteredItems} />
        </Box>

        <Box sx={{ mb: 4 }}>
          <StockVsSalesBarChart items={filteredItems} />
        </Box>

        <Box sx={{ mb: 4 }}>
          <SalesLineGraph items={filteredItems} />
        </Box>

        <Grid container spacing={4} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6} sx={{ mb: 4 }}>
            <PieChartGraph items={filteredItems} />
          </Grid>
          <Grid item xs={12} md={6}>
            <StockSpeedometerGraph items={filteredItems} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}