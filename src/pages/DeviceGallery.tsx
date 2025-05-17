import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import DeviceCard from "../components/Devices/DeviceCard";
import Pagination from "../components/Devices/Pagination";
import { DeviceBasicInfoProps } from "../types/DeviceBasicInfo";
import { useState, useEffect } from "react";
import { CaretDown } from "@phosphor-icons/react";

interface DeviceResponse {
  devices: DeviceBasicInfoProps[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    page_size: number;
  };
}

interface Brand {
  name: string;
  count: number;
}

const DeviceGallery = () => {
  const data = useLoaderData() as DeviceResponse;
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [brandFilter, setBrandFilter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const categoryFromUrl = searchParams.get('category');
  const currentSort = searchParams.get('sort') || '';

  const sortOptions = [
    { label: 'Mặc định', value: '' },
    { label: 'Giá tăng dần', value: 'price_asc' },
    { label: 'Giá giảm dần', value: 'price_desc' },
  ];

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/brands?category=${categoryFromUrl || ''}`);
        if (response.ok) {
          const data = await response.json();
          setBrands(data.brands || []);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        setBrands([]);
      }
    };

    fetchBrands();
  }, [categoryFromUrl]);

  const handleFilterChange = (type: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (type === "brand") {
      setBrandFilter(value);
      if (value) {
        newParams.set("brand", value);
      } else {
        newParams.delete("brand");
      }
    }
    if (categoryFromUrl) {
      newParams.set("category", categoryFromUrl);
    }
    if (currentSort) {
      newParams.set("sort", currentSort);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
    setCurrentPage(1);
    setIsBrandDropdownOpen(false);
  };

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("sort", value);
    } else {
      newParams.delete("sort");
    }
    if (categoryFromUrl) {
      newParams.set("category", categoryFromUrl);
    }
    if (brandFilter) {
      newParams.set("brand", brandFilter);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
    setCurrentPage(1);
    setIsSortDropdownOpen(false);
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    if (categoryFromUrl) {
      newParams.set("category", categoryFromUrl);
    }
    if (brandFilter) {
      newParams.set("brand", brandFilter);
    }
    if (currentSort) {
      newParams.set("sort", currentSort);
    }
    setSearchParams(newParams);
    setCurrentPage(page);
  };

  return (
    <>
      <div className="container mx-auto pt-20 lg:py-30  text-slate-800 lg:px-[180px] px-8">
        <motion.h1
          className="text-6xl font-bold  text-center py-[8px] mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Danh sách thiết bị
        </motion.h1>

        <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
          <div className="flex gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-4">Thương hiệu</h2>
              <div className="relative w-48">
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
                >
                  <span>{brandFilter.charAt(0).toUpperCase() + brandFilter.slice(1) || "Tất cả"}</span>
                  <CaretDown size={16} weight="bold" />
                </button>

                {isBrandDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => handleFilterChange("brand", "")}
                    >
                      Tất cả
                    </button>
                    {brands.map((brand) => (
                      <button
                        key={brand.name}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => handleFilterChange("brand", brand.name)}
                      >
                        <span className="capitalize">{brand.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Sắp xếp</h2>
              <div className="relative w-48">
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                >
                  <span>{sortOptions.find(opt => opt.value === currentSort)?.label || 'Mặc định'}</span>
                  <CaretDown size={16} weight="bold" />
                </button>

                {isSortDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => handleSortChange(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    
        {navigation.state !== "idle" ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7b75]"></div>
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {data.devices.length > 0 ? (
                data.devices.map((device, index) => (
                  <DeviceCard key={device.id} device={device} index={index} />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Không tìm thấy thiết bị phù hợp
                </div>
              )}
            </motion.div>

            {data.pagination.total_pages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={data.pagination.total_pages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DeviceGallery;