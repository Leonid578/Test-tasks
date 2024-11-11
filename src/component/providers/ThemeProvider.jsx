import React, { createContext, useState, useMemo } from "react";

export const ThemeContext = createContext({ isDark: false, themeColor: "white" });

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [themeColor, setThemeColor] = useState("white");  

  const value = useMemo(() => ({ isDark, setIsDark, themeColor, setThemeColor }), [isDark, themeColor]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
