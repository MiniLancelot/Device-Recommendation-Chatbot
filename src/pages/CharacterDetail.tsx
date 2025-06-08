import { useLoaderData, useNavigation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type DeviceProps = {
  id: string;
  name: string;
  display_name: string;
  brand: string;
  category: string;
  images: string[];
  prices: {
    [key: string]: Array<{
      color: string;
      price: number;
    }>;
  };
  urls: {
    [key: string]: string;
  };
  specifications: {
    [key: string]: string | string[];
  };
  features: string[];
};

const DeviceDetail = () => {
  const device = useLoaderData() as DeviceProps;
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalSelectedImage, setModalSelectedImage] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    initial: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    hover: {
      scale: 1.03,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  };

  if (navigation.state === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="rounded-full h-20 w-20 border-t-4 border-b-4 border-[#ff7b75]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (!price || price === 0) {
      return "Liên hệ cửa hàng";
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getLowestPrice = () => {
    let lowestPrice = Infinity;
    Object.values(device.prices).forEach((storePrices) => {
      storePrices.forEach(({ price }) => {
        if (price > 0 && price < lowestPrice) lowestPrice = price;
      });
    });
    return lowestPrice === Infinity ? 0 : lowestPrice;
  };

  // Get important specifications to show initially
  const getImportantSpecs = () => {
    const importantKeys = [
      "Kích thước màn hình",
      "Công nghệ màn hình",
      "Độ phân giải màn hình",
      "Camera sau",
      "Camera trước",
      "Chipset",
      "RAM",
      "Bộ nhớ trong",
      "Pin",
      "Hệ điều hành",
    ];

    return Object.entries(device.specifications)
      .filter(([key]) => importantKeys.includes(key))
      .slice(0, 6); // Show only first 6 important specs
  };

  const formatStoreName = (storeKey: string) => {
    const storeNames: { [key: string]: string } = {
      'cellphones': 'CellphoneS',
      'fptshop': 'FPT Shop',
      'tgdd': 'Thế Giới Di Động'
    };
    return storeNames[storeKey] || storeKey;
  };

  return (
    <motion.div
      className="min-h-screen pt-20 bg-[#fff8fa] text-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Device Header */}
        <motion.div
          className="mb-8 rounded-xl overflow-hidden shadow-lg relative bg-gradient-to-r from-blue-500 to-purple-500"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          ></motion.div>
          <div className="relative z-10 flex flex-col md:flex-row items-center p-6 md:p-8">
            <motion.div
              className="flex-shrink-0 mb-6 md:mb-0 md:mr-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            >
              <motion.div
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shadow-md"
                whileHover={{ scale: 1.05, borderColor: "#ffeb3b" }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={device.images[0]}
                  alt={device.display_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/150?text=Device";
                  }}
                />
              </motion.div>
            </motion.div>
            <motion.div
              className="text-center md:text-left"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {device.display_name}
              </motion.h1>
              <motion.div
                className="flex flex-wrap justify-center md:justify-start gap-4 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.div
                  className="flex items-center gap-2 bg-black bg-opacity-30 rounded-full px-4 py-2"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <span className="text-xl">🏭</span>
                  <span className="capitalize">{device.brand}</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 bg-black bg-opacity-30 rounded-full px-4 py-2"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <span className="text-xl">📱</span>
                  <span className="capitalize">{device.category}</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 bg-black bg-opacity-30 rounded-full px-4 py-2"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <span className="text-xl">💰</span>
                  <span>{getLowestPrice() > 0 ? `Từ ${formatPrice(getLowestPrice())}` : formatPrice(0)}</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Image Gallery */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
            >
              <div className="relative aspect-square">
                <img
                  src={device.images[selectedImage]}
                  alt={device.display_name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-4 grid grid-cols-5 gap-2">
                {device.images.slice(0, 9).map((image, index) => (
                  <motion.button
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`${device.display_name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
                {device.images.length > 9 && (
                  <motion.button
                    className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 relative"
                    onClick={() => {
                      setModalSelectedImage(0);
                      setIsImageModalOpen(true);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={device.images[9]}
                      alt={`${device.display_name} - more images`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 backdrop-blur-sm bg-white/40 flex items-center justify-center">
                      <span className="text-gray-800 text-sm font-bold drop-shadow-sm">
                        +{device.images.length - 9} more
                      </span>
                    </div>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Device Information */}
          <motion.div
            className="lg:col-span-3 space-y-8"
            variants={itemVariants}
          >
            {/* Prices Section */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6"
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
            >
              <h2 className="text-2xl font-bold mb-4">Giá tại các cửa hàng</h2>
              <div className="space-y-4">
                {Object.entries(device.prices).map(([store, prices]) => (
                  <div
                    key={store}
                    className="border-b last:border-b-0 pb-4 last:pb-0"
                  >
                    <h3 className="font-semibold text-lg mb-2">
                      {formatStoreName(store)}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {prices.map(({ color, price }, index) => (
                        <div
                          key={index}
                          className={`bg-gray-50 p-2 rounded ${
                            color === 'default' 
                              ? 'flex justify-center items-center' 
                              : 'flex justify-between items-center'
                          }`}
                        >
                          {color !== 'default' && (
                            <span className="text-sm">{color}</span>
                          )}
                          <span className="font-medium">
                            {formatPrice(price)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={device.urls[store]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-blue-500 hover:text-blue-600"
                    >
                      Xem tại {formatStoreName(store)} →
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Specifications Section */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8"
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  Thông số kỹ thuật
                </h2>
                <motion.button
                  onClick={() => setIsSpecModalOpen(true)}
                  className="px-6 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Xem tất cả
                </motion.button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getImportantSpecs().map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-700 mb-2 text-lg">
                      {key}
                    </h3>
                    <p className="text-gray-800 text-base">
                      {Array.isArray(value) ? value.join(", ") : value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features Section */}
            {/* <motion.div 
              className="bg-white rounded-xl shadow-lg p-6"
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
            >
              <h2 className="text-2xl font-bold mb-4">Tính năng nổi bật</h2>
              <ul className="list-disc list-inside space-y-2">
                {device.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </motion.div> */}
          </motion.div>
        </div>
      </motion.div>

      {/* Image Carousel Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous button */}
              <motion.button
                className="absolute left-4 z-10 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                onClick={() => setModalSelectedImage(modalSelectedImage > 0 ? modalSelectedImage - 1 : device.images.length - 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              {/* Main image */}
              <div className="bg-white rounded-lg p-4 max-w-3xl max-h-[80vh] flex items-center justify-center">
                <img
                  src={device.images[modalSelectedImage]}
                  alt={`${device.display_name} - ${modalSelectedImage + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Next button */}
              <motion.button
                className="absolute right-4 z-10 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                onClick={() => setModalSelectedImage(modalSelectedImage < device.images.length - 1 ? modalSelectedImage + 1 : 0)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {modalSelectedImage + 1} / {device.images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Specifications Modal */}
      <AnimatePresence>
        {isSpecModalOpen && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSpecModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    Thông số kỹ thuật chi tiết
                  </h2>
                  <motion.button
                    onClick={() => setIsSpecModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(device.specifications).map(([key, value]) => (
                    <div key={key} className="border-b last:border-b-0 pb-4">
                      <h3 className="font-medium text-gray-600 mb-2">{key}</h3>
                      <p className="text-gray-800">
                        {Array.isArray(value) ? value.join(", ") : value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DeviceDetail;
