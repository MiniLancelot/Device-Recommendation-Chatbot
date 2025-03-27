import { Sun, Moon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { NavbarProps } from "../../../types/Navbar";



const Navbar = ({ isDarkMode, toggleTheme }: NavbarProps) => {
  return (
    <nav className="container mx-auto py-2 lg:py-7 flex items-center justify-between">
      <h1
        className={`desc text-2xl lg:text-3xl font-bold ${
          isDarkMode ? "dark:text-primary-white-color" : "text-slate-800"
        }`}
      >
        Electron Chatbot
      </h1>

      <ul className="flex items-center gap-4">
        <li>
          <Link
            to="/"
            className={`desc text-lg lg:text-xl ${
              isDarkMode ? "dark:text-primary-white-color" : "text-slate-800"
            }`}
          >
            Home
          </Link>
        </li>
        {/* <li>
          <Link
            to="/characters"
            className={`desc text-lg lg:text-xl ${
              isDarkMode ? "dark:text-primary-white-color" : "text-slate-800"
            }`}
          >
            Characters
          </Link>
        </li> */}
        <li>
          <Link
            to="/test"
            className={`desc text-lg lg:text-xl ${
              isDarkMode ? "dark:text-primary-white-color" : "text-slate-800"
            }`}
          >
            Test
          </Link>
        </li>
        <li>
          <button
            onClick={toggleTheme}
            className={`w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center border-2 rounded-full cursor-pointer ${
              isDarkMode
                ? "dark:border-primary-white-color"
                : "border-slate-800"
            }`}
          >
            {isDarkMode ? (
              <Moon
                className="theme-icon text-primary-white-color"
                weight="bold"
              />
            ) : (
              <Sun className="theme-icon text-slate-800" weight="bold" />
            )}
          </button>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
