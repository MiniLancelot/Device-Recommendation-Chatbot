import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { DeviceBasicInfoProps } from "../../types/DeviceBasicInfo";

interface DeviceCardProps {
  device: DeviceBasicInfoProps;
  index: number;
}

const DeviceCard = ({ device, index }: DeviceCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      },
    },
  };

  const imageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getLowestPrice = () => {
    let lowestPrice: number | null = null;
    Object.values(device.prices).forEach(storePrices => {
      storePrices.forEach(({ price }) => {
        if (price && price > 0 && (lowestPrice === null || price < lowestPrice)) {
          lowestPrice = price;
        }
      });
    });
    return lowestPrice;
  };

  return (
    <Link to={`/devices/${device.id}`}>
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="relative aspect-square">
          {!imageLoaded && (
            <motion.div
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#f0f0f0] via-[#fafafa] to-[#f0f0f0] bg-[length:1000px_100%]"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
          )}
          <motion.img
            src={device.cover_image}
            alt={device.display_name}
            className="w-full h-full object-contain p-4"
            variants={imageVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ opacity: { duration: 0.5 } }}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/300x450?text=Device";
              setImageLoaded(true);
            }}
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 h-[3.5rem] line-clamp-2">
            {device.display_name}
          </h3>
          <div className="flex items-center justify-between">
            {(() => {
              const lowestPrice = getLowestPrice();
              return (
                <span className="text-primary-blue font-bold text-lg flex-shrink-0 truncate max-w-[70%]">
                  {lowestPrice !== null ? formatPrice(lowestPrice) : "Liên hệ"}
                </span>
              );
            })()}
            <span className="text-sm text-gray-500 ml-2 whitespace-nowrap">
              {Object.keys(device.prices).length} cửa hàng
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default DeviceCard;