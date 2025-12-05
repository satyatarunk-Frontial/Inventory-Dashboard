import themeData from "./global.styles.json";

let saved = localStorage.getItem("customFullTheme");

if (saved) {
  saved = JSON.parse(saved);
  themeData.themes.custom = saved;
}

export const AppTheme = themeData;
window.THEME = themeData;
