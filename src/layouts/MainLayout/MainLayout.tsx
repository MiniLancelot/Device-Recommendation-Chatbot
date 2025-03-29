import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header/Header";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";
import { useNavStore } from "../../stores/store";

const MainLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isMobileOpen, closeMobile } = useNavStore();
  const html = document.querySelector("html");

  useEffect(() => {
    if (html) {
      html.classList.add("-animated");
      html.classList.toggle("dark");
    }
  }, [html, isDarkMode]);

  const toggleTheme = () => {
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
      className={`main-container w-full min-h-screen flex flex-col justify-center items-center gap-5 ${
        isDarkMode ? "dark:bg-primary-dark-color" : "bg-primary-white-color"
      }`} // Maybe add 'relative' class to the main container
    >
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 bg-opacity-50 backdrop-blur-md z-30"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={closeMobile}
          />
        )}
      </AnimatePresence>

      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Outlet context={{ isDarkMode, toggleTheme }} />
    </div>
  );
};

export default MainLayout;
