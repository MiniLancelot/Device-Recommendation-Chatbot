import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CaretDown } from "@phosphor-icons/react";
import classNames from "classnames";

const DeviceDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deviceCategories = [
    { name: "Điện thoại", path: "/devices?category=dien-thoai" },
    { name: "Laptop", path: "/devices?category=laptop" },
    { name: "Màn hình", path: "/devices?category=man-hinh" },
    { name: "Máy tính bảng", path: "/devices?category=may-tinh-bang" },
    { name: "PC", path: "/devices?category=pc" },
  ];
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 px-4 py-2 text-lg lg:text-xl font-semibold cursor-pointer hover:text-primary-blue transition-colors">
        Thiết bị
        <CaretDown size={16} weight="bold" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          {deviceCategories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className={classNames(
                "block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                // currentPath === category.path ? "bg-gray-200" : ""
              )}
              onClick={() => setIsOpen(false)}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeviceDropdown;
