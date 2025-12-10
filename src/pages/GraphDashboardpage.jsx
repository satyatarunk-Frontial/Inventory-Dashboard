// src/pages/GraphDashboardpage.jsx
import React, { useState } from "react";
import { Box, Grid } from "@mui/material";

import GraphsHeader from "../components/graphs/GraphsHeader";
import CategoryTrendGraph from "../components/graphs/CategoryTrendGraph";
import SalesLineGraph from "../components/graphs/SalesLineGraph";
import PieChartGraph from "../components/graphs/PieChartGraph";
import StockSpeedometerGraph from "../components/graphs/SpeedometerGraph";
import StockVsSalesBarChart from "../components/graphs/StockVsSalesGraph";

import {
  mergeAllCategories,
  filterItemsByCategory,
} from "../components/graphs/graphUtils";

// EXISTING CATEGORIES
import nonveg from "../data/nonveg.json";
import vegetable from "../data/vegetable.json";
import powders from "../data/powders.json";
import millets from "../data/millets.json";
import readytoeat from "../data/readytoeat.json";
import organic from "../data/organic.json";

// NEW SWEETS CATEGORIES
import dryfruitLaddu from "../data/dryfruit-laddufevi.json";
import ragiBiscuits from "../data/ragi-biscuitsfevi.json";
import milletSweets from "../data/millet-sweetsfevi.json";

export default function GraphDashboardpage() {
  const allItems = mergeAllCategories(
    vegetable,
    nonveg,
    powders,
    millets,
    readytoeat,
    organic,
    dryfruitLaddu,
    ragiBiscuits,
    milletSweets
  );

  const [globalCategory, setGlobalCategory] = useState("all");
  const [date, setDate] = useState("");

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

        <Box sx={{ mb: 4, mt: 3 }}>
          <CategoryTrendGraph items={filteredItems} />
        </Box>

        <Box sx={{ mb: 4 }}>
          <StockVsSalesBarChart items={filteredItems} />
        </Box>

        <Box sx={{ mb: 4 }}>
          <SalesLineGraph items={filteredItems} />
        </Box>

        {/* ONLY CHANGE: Force side-by-side layout with fixed height */}
        <Grid container spacing={4} sx={{ mb: 2 }}>
  {/* Pie Chart - Left on laptop+, Top on mobile/tablet */}
  <Grid
    item
    xs={12}           // Full width on mobile
    md={6}            // Half width from 900px upwards (laptops & above)
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: { xs: 420, md: 520 },
    }}
  >
    <Box sx={{ width: "100%", maxWidth: 760 }}>
      <PieChartGraph items={filteredItems} />
    </Box>
  </Grid>

  {/* Speedometer - Right on laptop+, Bottom on mobile/tablet */}
  <Grid
    item
    xs={12}
    md={6}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: { xs: 420, md: 520 },
    }}
  >
    <Box sx={{ width: "100%", minWidth: { xs: 300, md: 320 }, minHeight: 420 }}>
      <StockSpeedometerGraph items={filteredItems} />
    </Box>
  </Grid>
</Grid>
      </Box>
    </Box>
  );
}
