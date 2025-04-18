import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header/Header";
import { useState, useEffect } from "react";
import "./styles.css";

const MainLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const html = document.querySelector("html");

  useEffect(() => {
    if (html) {
      html.classList.add("-animated");
      html.classList.toggle("dark");
    }
  }, [html, isDarkMode]);

  const toggleTheme = () => {
    // Use document.startViewTransition for smooth transitions
    if (document.startViewTransition) {
      console.log("View Transition API is supported");
      document.startViewTransition(() => {
        setIsDarkMode(!isDarkMode);
      });
    } else {
      console.log("View Transition API is not supported");
      setIsDarkMode(!isDarkMode);
    }
  };
  return (
    <div
      className={`main-container bg-amber-500 w-full min-h-screen flex flex-col justify-start items-start gap-5 ${
        isDarkMode ? "dark:bg-primary-dark-color" : "bg-primary-color"
      }`}
    >
      <Header />
      <Outlet context={{ isDarkMode, toggleTheme }} />
    </div>
  );
};

export default MainLayout;
