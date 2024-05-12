import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const useTheme = () => {
  const value = useContext(ThemeContext);
  return value;
};

export default useTheme;
