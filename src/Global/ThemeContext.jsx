import { createContext, useEffect, useState } from "react";
import themeData from "./global.styles.json";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(themeData.themes.blue); // default

  // load saved theme from localStorage on first load
  useEffect(() => {
    const saved = localStorage.getItem("customFullTheme");
    if (saved) setTheme(JSON.parse(saved));
  }, []);

  // update theme live without refresh
  useEffect(() => {
    const handler = () => {
      const saved = localStorage.getItem("customFullTheme");
      if (saved) setTheme(JSON.parse(saved));
    };

    window.addEventListener("themeUpdated", handler);
    return () => window.removeEventListener("themeUpdated", handler);
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
