import { motion } from "framer-motion";

type DeviceFiltersProps = {
  brandTypes: string[];
  categoryTypes: string[];
  currentBrand: string;
  currentCategory: string;
  onFilterChange: (filterType: string, value: string) => void;
};

const DeviceFilter = ({
  brandTypes,
  categoryTypes,
  currentBrand,
  currentCategory,
  onFilterChange,
}: DeviceFiltersProps) => {
  return (
    <motion.div
      className="mb-8 p-4 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">Phân loại</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Thương hiệu</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                currentBrand === ""
                  ? "bg-primary-blue text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => onFilterChange("brand", "")}
            >
              Tất cả
            </button>
            {brandTypes.map((brand) => (
              <button
                key={brand}
                className={`px-3 py-1 rounded-full text-sm ${
                  currentBrand === brand
                    ? "bg-primary-blue text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => onFilterChange("brand", brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Danh mục</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                currentCategory === ""
                  ? "bg-primary-blue text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => onFilterChange("category", "")}
            >
              Tất cả
            </button>
            {categoryTypes.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm ${
                  currentCategory === category
                    ? "bg-primary-blue text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => onFilterChange("category", category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeviceFilter;
