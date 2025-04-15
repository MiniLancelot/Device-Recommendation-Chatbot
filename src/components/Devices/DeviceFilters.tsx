import { motion } from "framer-motion";

type DeviceFiltersProps = {
  weaponTypes: string[]; // Sau này đổi thành sort thiết bị
  visionTypes: string[]; // Sau này đổi thành sort 'Sắp xếp theo'
  currentWeapon: string;
  currentVision: string;
  onFilterChange: (filterType: string, value: string) => void;
};

const DeviceFilter = ({
  weaponTypes,
  visionTypes,
  currentWeapon,
  currentVision,
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
          <h3 className="text-sm font-medium mb-2">Sắp xếp theo</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                currentWeapon === ""
                  ? "bg-primary-blue text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => onFilterChange("weapon", "")}
            >
              All
            </button>
            {weaponTypes.map((weapon) => (
              <button
                key={weapon}
                className={`px-3 py-1 rounded-full text-sm ${
                  currentWeapon === weapon
                    ? "bg-primary-blue text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => onFilterChange("weapon", weapon)}
              >
                {weapon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Chọn theo tiêu chí</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                currentVision === ""
                  ? "bg-primary-blue text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => onFilterChange("vision", "")}
            >
              All
            </button>
            {visionTypes.map((vision) => (
              <button
                key={vision}
                className={`px-3 py-1 rounded-full text-sm ${
                  currentVision === vision
                    ? "bg-primary-blue text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => onFilterChange("vision", vision)}
              >
                {vision}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeviceFilter;
