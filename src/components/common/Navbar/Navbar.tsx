import { List, X } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavStore } from "../../../stores/store";
import Logo from "./Logo";
import NavLinkItem from "./NavLinkItem";
import NavIndicator from "./NavIndicator";
import MobileMenu from "./MobileMenu";
import { LuSearch } from "react-icons/lu";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState({
    width: 0,
    left: 0,
  });

  const menuRef = useRef<HTMLUListElement>(null);
  const mobileItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { isMobileOpen, toggleMobile, closeMobile } = useNavStore();
  const location = useLocation();

  const navLinks = useMemo(
    () => [
      { name: "Trang Chủ", path: "/" },
      { name: "Thiết bị", path: "/devices" },
      { name: "Tin Công nghệ", path: "/" },
      { name: "Test", path: "/test" },
    ],
    []
  );

  useEffect(() => {
    const currentPath = location.pathname;
    const exactMatchIndex = navLinks.findIndex(
      (link) => link.path === currentPath
    );
    if (exactMatchIndex !== -1) return setActiveIndex(exactMatchIndex);

    for (let i = 0; i < navLinks.length; i++) {
      if (
        navLinks[i].path !== "/" &&
        currentPath.startsWith(navLinks[i].path)
      ) {
        return setActiveIndex(i);
      }
    }
    setActiveIndex(0);
  }, [location.pathname, navLinks]);

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

  const updateIndicator = (index: number) => {
    const items =
      menuRef.current?.querySelectorAll<HTMLDivElement>(".menu-item");
    if (items?.[index])
      setIndicatorStyle({
        width: items[index].offsetWidth,
        left: items[index].offsetLeft,
      });
  };

  const updateMobileIndicator = (index: number) => {
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
          <Logo logoName="Techie"/>
          <ul
            ref={menuRef}
            className="hidden lg:flex items-center gap-4 relative"
          >
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLinkItem
                  to={link.path}
                  label={link.name}
                  isActive={activeIndex === index}
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
            <NavIndicator style={indicatorStyle} />
          </ul>
        </div>

        <div className="relative w-full sm:w-80 md:w-96 lg:w-90 inline-block">
  <input
    type="text"
    placeholder="Tìm kiếm nhanh"
    className="w-full bg-primary-color rounded-full pl-4 pr-10 py-2 focus:outline-none text-sm sm:text-base"
  />
  <LuSearch
    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
    size={20}
  />
</div>

      </nav>
      <div className="lg:hidden flex mr-2">
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
