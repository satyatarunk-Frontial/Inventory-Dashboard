import themeData from "./global.styles.json";

let saved = localStorage.getItem("customFullTheme");

if (saved) {
  saved = JSON.parse(saved);
  themeData.themes.custom = saved;
} else {
  themeData.themes.custom = themeData.themes.blue;
}

// ⭐ Listen for updates → Live theme change without refresh
window.addEventListener("themeUpdated", () => {
  const newSaved = JSON.parse(localStorage.getItem("customFullTheme"));
  themeData.themes.custom = newSaved;
});

export const AppTheme = themeData;
window.THEME = themeData;
