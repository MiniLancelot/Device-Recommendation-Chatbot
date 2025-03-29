import { Sun, Moon, List, X } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { NavbarProps } from "../../../types/Navbar";
import { useEffect, useRef, useState } from "react";
import { useNavStore } from "../../../stores/store";

const Navbar = ({ isDarkMode, toggleTheme }: NavbarProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState({
    width: 0,
    left: 0,
  });
  const menuRef = useRef<HTMLUListElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { isMobileOpen, toggleMobile, closeMobile } = useNavStore();

  const navLinks = [
    { name: "Trang Chủ", path: "/" },
    { name: "Điện thoại", path: "/" },
    { name: "Tin Công nghệ", path: "/" },
    { name: "Test", path: "/test" },
    // { name: "Characters", path: "/characters" },
  ];

  useEffect(() => {
    updateIndicator(activeIndex);
    if (isMobileOpen) {
      updateMobileIndicator(activeIndex);
    }

    const handleResize = () => {
      updateIndicator(activeIndex);
      if (isMobileOpen) {
        updateMobileIndicator(activeIndex);
      }
      
      if (window.innerWidth >= 1024 && isMobileOpen) {
        closeMobile();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex, isMobileOpen, closeMobile]);

  const updateIndicator = (index: number) => {
    if (!menuRef.current) return;
    const items =
      menuRef.current.querySelectorAll<HTMLDivElement>(".menu-item");
    if (items[index]) {
      const item = items[index];
      setIndicatorStyle({ width: item.offsetWidth, left: item.offsetLeft });
    }
  };
  

  const updateMobileIndicator = (index: number) => {
    if (!mobileItemRefs.current[index]) return;
    const item = mobileItemRefs.current[index];
    if (item) {
      // Measure the text width more accurately
      const textWidth = item.scrollWidth;
      setMobileIndicatorStyle({
        width: textWidth,
        left: item.offsetLeft,
      });
    }
  };

  return (
    <>
      <nav className="container mx-auto lg:px-2 py-3 lg:py-5 flex items-center justify-between z-20 relative">
        <h1
          className={`desc text-2xl lg:text-3xl font-bold ${
            isDarkMode ? "text-primary-white-color" : "text-primary-white-color"
          }`}
        >
          Electron Chatbot
        </h1>
        <ul
          ref={menuRef}
          className="hidden lg:flex items-center gap-4 relative"
        >
          {navLinks.map((items, index) => (
            <li key={index}>
              <Link
                to={items.path} // ${isDarkMode ? "text-primary-white-color" : "text-slate-800"}
                className={`menu-item desc text-lg lg:text-xl cursor-pointer transition-opacity 
                ${
                  activeIndex === index
                    ? "text-primary-blue"
                    : hoverIndex === index
                    ? "text-primary-white-color opacity-100"
                    : "text-primary-white-color opacity-75"
                }
                `}
                onMouseEnter={() => {
                  setHoverIndex(index);
                  updateIndicator(index);
                }}
                onMouseLeave={() => {
                  setHoverIndex(null);
                  updateIndicator(activeIndex);
                }}
                onClick={() => setActiveIndex(index)}
              >
                {items.name}
              </Link>
            </li>
          ))}
          <div
            className="absolute bottom-[-0.2rem] lg:bottom-[-0.4rem] flex items-center h-[2px] transition-all duration-900 ease-in-out"
            style={{ width: indicatorStyle.width, left: indicatorStyle.left }}
          >
            <div className="bg-blue-400 h-full flex-grow rounded-full"></div>
            <div className="bg-blue-400 h-full w-1 ml-1 rounded-full"></div>
          </div>
          {/* <li>
          <button
            onClick={toggleTheme}
            className={`w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center border-2 rounded-full cursor-pointer ${
              isDarkMode
                ? "dark:border-primary-white-color"
                : "border-primary-white-color"
            }`}
          >
            {isDarkMode ? (
              <Moon
                className="theme-icon text-primary-white-color"
                weight="bold"
              />
            ) : (
              <Sun
                className="theme-icon text-primary-white-color" //text-slate-800
                weight="bold"
              /> 
            )}
          </button>
        </li> */}
        </ul>
      </nav>
      <div className="lg:hidden flex">
        <button onClick={toggleMobile}>
          {isMobileOpen ? (
            <X size={32} className="text-primary-white-color cursor-pointer" />
          ) : (
            <List
              size={32}
              className="text-primary-white-color cursor-pointer"
            />
          )}
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        className={`fixed top-0  right-0 w-2/5 h-[100vh] bg-[#0e0e0e] text-white transition-all duration-500 z-10 mt-14  ${
          isMobileOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        } lg:hidden`}
      >
        <div className="flex flex-col mt-20 space-y-6 pl-6">
          {navLinks.map((item, index) => (
            <div key={index} className="relative pb-2">
              <Link
                to={item.path}
                ref={(el) => {
                  mobileItemRefs.current[index] = el;
                }}
                className={`menu-item desc text-lg lg:text-xl cursor-pointer transition-opacity
                ${
                  activeIndex === index
                    ? "text-primary-blue"
                    : hoverIndex === index
                    ? "text-primary-white-color opacity-100"
                    : "text-primary-white-color opacity-75"
                }
                `}
                onClick={() => {
                  setActiveIndex(index);
                  closeMobile();
                }}
              >
                {item.name}
                {activeIndex === index && (
                  <div
                    className="absolute bottom-0 left-0 flex h-[2px] transition-all duration-300 ease-in-out"
                    style={{ width: mobileIndicatorStyle.width }}
                  >
                    <div className="bg-blue-400 h-full flex-grow rounded-full"></div>
                    <div className="bg-blue-400 h-full w-1 ml-1 rounded-full"></div>
                  </div>
                )}
              </Link>{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
