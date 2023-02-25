// ! Next and React
import { createContext, ReactNode, useContext, useEffect } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

export const THEME_STORAGE_KEY = "CHAMOMILE_CLUB_THEME";

export const DARK_CLASS = "dark";

const SUPPORTED_THEMES = ["light", "dark"] as const;

const initialContext: ThemeContextType = { theme: "light", setTheme: () => {} }

const ThemeContext = createContext(initialContext);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useLocalStorage<Themes>(THEME_STORAGE_KEY, initialContext.theme);

  useEffect(() => {
    document.documentElement.classList.toggle(DARK_CLASS, theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext);

type Themes = typeof SUPPORTED_THEMES[number];

type ThemeContextType = { theme: Themes, setTheme: (value: Themes) => void }

export interface ThemeProviderProps { children: ReactNode }

export default ThemeProvider;

