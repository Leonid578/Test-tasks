// import { createContext, useMemo, useState } from 'react'
// export const ThemeContext = createContext({ isDark: false })
import React, { createContext, useState, useMemo } from "react";

// export const ThemeProvider = ({ children }) => {
// 	const [isDark, setIsDark] = useState(false)
// 	const value = useMemo(() => ({ isDark, setIsDark }), [isDark])

export const ThemeContext = createContext({
  isDark: false,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState("default"); // Добавляем состояние для темы

  const value = useMemo(
    () => ({
      isDark,
      setIsDark,
      theme,
      setTheme,
    }),
    [isDark, theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// 	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
// }
