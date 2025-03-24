import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { Theme } from "./types";
import { lightTheme, darkTheme } from "./themes";

// Defines a React Context to manage and provide the app's theme

// Defines the structure of the context
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (mode: "light" | "dark" | "system") => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Initialises the theme mode based on device settings
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(
    "system"
  );
  const [theme, setTheme] = useState<Theme>(
    systemColorScheme === "dark" ? darkTheme : lightTheme
  );

  // Apply theme based on system changes or manual override
  useEffect(() => {
    if (themeMode === "system") {
      setTheme(systemColorScheme === "dark" ? darkTheme : lightTheme);
    }
  }, [systemColorScheme, themeMode]);

  // Toggle theme manually
  // const toggleTheme = () => {
  //   if (themeMode === "light") {
  //     setThemeMode("dark");
  //     setTheme(darkTheme);
  //   } else if (themeMode === "dark") {
  //     setThemeMode("system");
  //     setTheme(systemColorScheme === "dark" ? darkTheme : lightTheme);
  //   } else {
  //     setThemeMode("light");
  //     setTheme(lightTheme);
  //   }
  // };
  const toggleTheme = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
      setTheme(darkTheme);
    } else {
      setThemeMode("light");
      setTheme(lightTheme);
    }
  };

  // Manually set theme or revert to system
  const setThemeModeManual = (mode: "light" | "dark" | "system") => {
    setThemeMode(mode);
    if (mode === "system") {
      setTheme(systemColorScheme === "dark" ? darkTheme : lightTheme);
    } else {
      setTheme(mode === "dark" ? darkTheme : lightTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme: setThemeMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
