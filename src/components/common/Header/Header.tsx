import Navbar from "../Navbar/Navbar";

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header = ({ isDarkMode, toggleTheme }: HeaderProps) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all backdrop-blur-md flex flex-row justify-between items-center w-full px-2 ${
        isDarkMode
          ? "dark:bg-primary-dark-color/10"
          // : "bg-primary-white-color/10"
          : "bg-primary-dark-color/80"
      }`}
    >
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </header>
  );
};

export default Header;
