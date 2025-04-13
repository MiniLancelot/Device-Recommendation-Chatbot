import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DeviceCard from "../components/Devices/DeviceCard";
import DeviceFilters from "../components/Devices/DeviceFilters";
import Pagination from "../components/Devices/Pagination";
import { DeviceBasicInfoProps } from "../types/DeviceBasicInfo";

const DeviceGallery = () => {
  const devices = useLoaderData() as DeviceBasicInfoProps[];
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredDevices, setFilteredDevices] = useState<
    DeviceBasicInfoProps[]
  >([]);

  const currentPage = Number(searchParams.get("page") || 1);
  const pageSize = 24; // Devices per page

  const weaponFilter = searchParams.get("weapon") || "";
  const visionFilter = searchParams.get("vision") || "";

  useEffect(() => {
    let result = [...devices];

    if (weaponFilter) {
      result = result.filter(
        (device) => device.weapon.toLowerCase() === weaponFilter.toLowerCase()
      );
    }

    if (visionFilter) {
      result = result.filter(
        (device) => device.vision?.toLowerCase() === visionFilter.toLowerCase()
      );
    }

    setFilteredDevices(result);
  }, [devices, weaponFilter, visionFilter]);

  const handleFilterChange = (filterType: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(filterType, value);
    } else {
      newParams.delete(filterType);
    }

    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  const totalPages = Math.ceil(filteredDevices.length / pageSize);
  const paginatedDevices = filteredDevices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const weaponTypes = Array.from(
    new Set(devices.map((device) => device.weapon))
  );
  const visionTypes = Array.from(
    new Set(devices.map((device) => device.vision).filter(Boolean) as string[])
  );

  // if (navigation.state === "loading") {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7b75]"></div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="container mx-auto pt-20 lg:py-30 px-4 text-slate-800">
        <motion.h1
          className="text-6xl font-bold  text-center py-[8px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Danh sách thiết bị
        </motion.h1>

        <DeviceFilters
          weaponTypes={weaponTypes}
          visionTypes={visionTypes}
          currentWeapon={weaponFilter}
          currentVision={visionFilter}
          onFilterChange={handleFilterChange}
        />
    
    {navigation.state !== "idle"  ? (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7b75]"></div>
  </div>
) : (
  <>
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {paginatedDevices.length > 0 ? (
        paginatedDevices.map((device, index) => (
          <DeviceCard key={device.name} device={device} index={index} />
        ))
      ) : (
        <div className="col-span-full text-center py-10 text-gray-500">
          No characters match the selected filters
        </div>
      )}
    </motion.div>

    {filteredDevices.length > pageSize && (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
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
