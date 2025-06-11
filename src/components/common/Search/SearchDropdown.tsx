import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuSearch, LuX } from 'react-icons/lu';
import { useDebounce } from '../../../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

interface SearchDevice {
  id: string;
  display_name: string;
  cover_image: string;
  min_price: number;
  brand: string;
}

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ isOpen, onClose, searchTerm }) => {
  const [searchResults, setSearchResults] = useState<SearchDevice[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchDevice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('deviceSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Fetch random devices or search results
  useEffect(() => {
    const fetchDevices = async () => {
      if (!isOpen) return;

      setIsLoading(true);
      try {
        if (!debouncedSearchTerm.trim()) {
          // Show history if available, otherwise show random devices
          if (searchHistory.length > 0) {
            setSearchResults(searchHistory.slice(0, 5));
          } else {
            // Fetch 5 random devices
            const response = await fetch('http://127.0.0.1:8000/devices?page=1&page_size=5');
            if (response.ok) {
              const data = await response.json();
              setSearchResults(data.devices || []);
            }
          }
        } else {
          // Search for devices
          const response = await fetch(
            `http://127.0.0.1:8000/devices?page=1&page_size=5&search=${encodeURIComponent(debouncedSearchTerm)}`
          );
          if (response.ok) {
            const data = await response.json();
            setSearchResults(data.devices || []);
          }
        }
        setShowResults(true);
      } catch (error) {
        console.error('Error fetching devices:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevices();
  }, [debouncedSearchTerm, isOpen, searchHistory]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const capitalizeBrand = (brand: string) => {
    return brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
  };

  const saveToHistory = (device: SearchDevice) => {
    const updatedHistory = [
      device,
      ...searchHistory.filter(item => item.id !== device.id)
    ].slice(0, 10); // Keep only 10 most recent items

    setSearchHistory(updatedHistory);
    localStorage.setItem('deviceSearchHistory', JSON.stringify(updatedHistory));
  };

  const handleDeviceClick = (device: SearchDevice) => {
    saveToHistory(device);
    navigate(`/devices/${device.id}`);
    onClose();
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('deviceSearchHistory');
    setSearchResults([]);
  };

  const removeFromHistory = (deviceId: string) => {
    const updatedHistory = searchHistory.filter(item => item.id !== deviceId);
    setSearchHistory(updatedHistory);
    localStorage.setItem('deviceSearchHistory', JSON.stringify(updatedHistory));
    if (!searchTerm.trim()) {
      setSearchResults(updatedHistory.slice(0, 5));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-hidden"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-blue border-t-transparent" />
              </div>
            ) : (
              <>
                {/* Header */}
                {showResults && (
                  <div className="flex items-center justify-between px-4 py-3 ">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {!searchTerm.trim() && searchHistory.length > 0 ? (
                        <>
                          
                          <span>Lịch sử tìm kiếm</span>
                        </>
                      ) : (
                        <>
                          {/* <LuSearch size={16} /> */}
                          <span>
                            {searchTerm.trim() ? 'Kết quả tìm kiếm' : 'Thiết bị gợi ý'}
                          </span>
                        </>
                      )}
                    </div>
                    {!searchTerm.trim() && searchHistory.length > 0 && (
                      <button
                        onClick={clearHistory}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Xóa lịch sử
                      </button>
                    )}
                  </div>
                )}

                {/* Device List */}
                <div className="py-2">
                  <AnimatePresence>
                    {searchResults.map((device, index) => (
                      <motion.div
                        key={device.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer group"
                        onClick={() => handleDeviceClick(device)}
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={device.cover_image}
                            alt={device.display_name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/48?text=Device";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate group-hover:text-primary-blue transition-colors">
                            {device.display_name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{capitalizeBrand(device.brand)}</span>
                            <span>•</span>
                            <span className="font-medium text-primary-blue">
                              {device.min_price > 0 ? formatPrice(device.min_price) : 'Liên hệ'}
                            </span>
                          </div>
                        </div>
                        {!searchTerm.trim() && searchHistory.some(item => item.id === device.id) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromHistory(device.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                          >
                            <LuX size={14} />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {searchResults.length === 0 && showResults && !isLoading && (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <LuSearch size={32} className="mx-auto mb-2 opacity-50" />
                      <p>Không tìm thấy thiết bị nào</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDropdown; 