import { createContext, useEffect, useState } from "react";

export const themeContext = createContext();

export default function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  const body = document.querySelector("body");

  const changeMode = () => {

    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));

    if (newMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  };

  useEffect(() => {

    if (darkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <themeContext.Provider value={{ darkMode, changeMode }}>
      {children}
    </themeContext.Provider>
  );
}
