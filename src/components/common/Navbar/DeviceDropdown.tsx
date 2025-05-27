import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CaretDown } from '@phosphor-icons/react';

const DeviceDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const deviceCategories = [
    { name: 'Điện thoại', path: '/devices?category=dien-thoai' },
    { name: 'Laptop', path: '/devices?category=laptop' },
    { name: 'Màn hình', path: '/devices?category=man-hinh' },
    { name: 'Máy tính bảng', path: '/devices?category=may-tinh-bang' },
    { name: 'PC', path: '/devices?category=pc' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-1 px-4 py-2 text-lg hover:text-primary-blue transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        Thiết bị
        <CaretDown size={16} weight="bold" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          {deviceCategories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
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