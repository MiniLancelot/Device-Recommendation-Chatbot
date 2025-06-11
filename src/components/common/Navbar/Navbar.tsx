import { List, X } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavStore } from "../../../stores/store";
import Logo from "./Logo";
import NavLinkItem from "./NavLinkItem";
import NavIndicator from "./NavIndicator";
import MobileMenu from "./MobileMenu";
import { LuSearch } from "react-icons/lu";
import DeviceDropdown from "./DeviceDropdown";
import SearchDropdown from "../Search/SearchDropdown";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState({
    width: 0,
    left: 0,
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const menuRef = useRef<HTMLUListElement>(null);
  const mobileItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isMobileOpen, toggleMobile, closeMobile } = useNavStore();
  const location = useLocation();

  const navLinks = useMemo(() => [{ name: "Trang Chủ", path: "/" }], []);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      setActiveIndex(0);
    } else {
      setActiveIndex(-1);
    }
  }, [location.pathname]);

  useEffect(() => {
    const update = () => {
      updateIndicator(activeIndex);
      if (isMobileOpen) updateMobileIndicator(activeIndex);
      if (window.innerWidth >= 1024 && isMobileOpen) closeMobile();
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeIndex, isMobileOpen, closeMobile]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateIndicator = (index: number) => {
    if (index === -1) {
      // Ẩn indicator nếu không có item active
      setIndicatorStyle({ width: 0, left: 0 });
      return;
    }

    const items =
      menuRef.current?.querySelectorAll<HTMLDivElement>(".menu-item");
    if (items?.[index])
      setIndicatorStyle({
        width: items[index].offsetWidth,
        left: items[index].offsetLeft,
      });
  };

  const updateMobileIndicator = (index: number) => {
    if (index === -1) {
      setMobileIndicatorStyle({ width: 0, left: 0 });
      return;
    }

    const item = mobileItemRefs.current[index];
    if (item)
      setMobileIndicatorStyle({
        width: item.scrollWidth,
        left: item.offsetLeft,
      });
  };

  return (
    <>
      <nav className="container mx-2 lg:mx-auto lg:px-2 py-3 lg:py-5 flex items-center justify-between z-20 relative">
        <div className="lg:flex flex-row gap-5">
          <Logo />
          <ul
            ref={menuRef}
            className="hidden lg:flex items-center gap-4 relative"
          >
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLinkItem
                  to={link.path}
                  label={link.name}
                  // isActive={activeIndex === index}
                  isHovered={hoverIndex === index}
                  onMouseEnter={() => {
                    setHoverIndex(index);
                    updateIndicator(index);
                  }}
                  onMouseLeave={() => {
                    setHoverIndex(null);
                    updateIndicator(activeIndex);
                  }}
                  onClick={() => setActiveIndex(index)}
                />
              </li>
            ))}
            <li>
              <DeviceDropdown />
            </li>
            <NavIndicator style={indicatorStyle} />
          </ul>
        </div>

        <div
          ref={searchRef}
          className="relative w-full sm:w-80 md:w-85 lg:w-90 inline-block"
        >
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Tìm kiếm nhanh"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-primary-color rounded-full pl-4 pr-10 py-2 focus:outline-none text-sm sm:text-base mx-4 lg:mx-0"
              onFocus={() => setIsSearchOpen(true)}
            />
            <LuSearch
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
              size={20}
            />
          </div>

          <SearchDropdown
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            searchTerm={searchTerm}
          />
        </div>
      </nav>
      <div className="lg:hidden flex my-4 ml-4 mr-1 justify-between">
        <div className="flex-1"></div>
        <button onClick={toggleMobile}>
          {isMobileOpen ? (
            <X size={32} className="text-primary-dark-color cursor-pointer" />
          ) : (
            <List
              size={32}
              className="text-primary-dark-color cursor-pointer"
            />
          )}
        </button>
      </div>
      <MobileMenu
        navLinks={navLinks}
        isOpen={isMobileOpen}
        activeIndex={activeIndex}
        hoverIndex={hoverIndex}
        closeMobile={closeMobile}
        setActiveIndex={setActiveIndex}
        refs={mobileItemRefs}
        mobileIndicatorStyle={mobileIndicatorStyle}
      />
    </>
  );
};

export default Navbar;
