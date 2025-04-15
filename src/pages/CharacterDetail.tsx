import { useLoaderData, useNavigation, useParams, Link } from "react-router-dom";
import { baseUrl } from "../constants/baseUrl";
import { motion } from "framer-motion";
import { useState } from "react";

type CharacterProps = {
  name: string;
  vision: string;
  weapon: string;
  description?: string;
};

const CharacterDetail = () => {
  const { characterName } = useParams<{ characterName: string }>();
  const character = useLoaderData() as CharacterProps;
  const navigation = useNavigation();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    initial: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
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

  const getVisionGradient = (vision: string) => {
    const visionColors: Record<string, string> = {
      Pyro: "from-red-500 to-orange-500",
      Hydro: "from-blue-500 to-cyan-400",
      Anemo: "from-teal-400 to-emerald-500",
      Electro: "from-purple-600 to-indigo-400",
      Cryo: "from-blue-300 to-sky-200",
      Geo: "from-yellow-500 to-amber-400",
      Dendro: "from-green-500 to-lime-400",
      Unknown: "from-gray-500 to-slate-400"
    };

    return visionColors[vision] || visionColors.Unknown;
  };

  const getWeaponIcon = (weapon: string) => {
    switch (weapon.toLowerCase()) {
      case 'sword': return '⚔️';
      case 'claymore': return '🗡️';
      case 'polearm': return '🔱';
      case 'catalyst': return '📘';
      case 'bow': return '🏹';
      default: return '🔪';
    }
  };

  // Shimmer loading animation
  const shimmerVariants = {
    initial: {
      backgroundPosition: "-500px 0",
    },
    animate: {
      backgroundPosition: "500px 0",
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      },
    },
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
        {/* Character Banner/Header */}
        <motion.div 
          className={`mb-8 rounded-xl overflow-hidden shadow-lg relative bg-gradient-to-r ${getVisionGradient(character.vision)}`}
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
                  src={`${baseUrl}/${characterName}/icon`} 
                  alt={character.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150?text=Character";
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
                {character.name}
              </motion.h1>
              <motion.div 
                className="flex flex-wrap justify-center md:justify-start gap-4 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.div 
                  className="flex items-center gap-2 bg-black bg-opacity-30 rounded-full px-4 py-2"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                  <span className="text-xl">{getWeaponIcon(character.weapon)}</span>
                  <span>{character.weapon}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 bg-black bg-opacity-30 rounded-full px-4 py-2"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                  <span className="text-xl">✨</span>
                  <span>{character.vision}</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div 
            className="lg:col-span-2 flex justify-center"
            variants={itemVariants}
          >
            <motion.div 
              className="rounded-lg overflow-hidden shadow-md bg-white relative"
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
            >
              {/* Image loading shimmer */}
              {!imageLoaded && (
                <motion.div
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#f0f0f0] via-[#fafafa] to-[#f0f0f0] bg-[length:1000px_100%]"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                >
                  <div className="h-full w-full flex items-center justify-center">
                    <motion.div 
                      className="text-[#ff7b75] opacity-90"
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        scale: [0.98, 1.02, 0.98],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    >
                      Loading...
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              <motion.img 
                src={`${baseUrl}/${characterName}/card`} 
                alt={character.name} 
                className="w-full h-auto object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/300x500?text=Character+Card";
                  setImageLoaded(true);
                }}
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:col-span-3"
            variants={itemVariants}
          >
            <motion.div 
              className="rounded-lg shadow-md p-6 bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.h2 
                className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#ff7b75] to-[#e46167] bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Character Details
              </motion.h2>

              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold mb-1 text-gray-700">Vision</h3>
                  <motion.p 
                    className="relative pl-3 before:content-[''] before:absolute before:w-1 before:h-full before:bg-gradient-to-b before:from-[#ff7b75] before:to-[#e46167] before:left-0 before:rounded-full"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {character.vision}
                  </motion.p>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold mb-1 text-gray-700">Weapon</h3>
                  <motion.p 
                    className="relative pl-3 before:content-[''] before:absolute before:w-1 before:h-full before:bg-gradient-to-b before:from-[#ff7b75] before:to-[#e46167] before:left-0 before:rounded-full"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {character.weapon}
                  </motion.p>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold mb-1 text-gray-700">Description</h3>
                  {character.description ? (
                    <motion.p 
                      className="text-justify relative pl-3 before:content-[''] before:absolute before:w-1 before:h-full before:bg-gradient-to-b before:from-[#ff7b75] before:to-[#e46167] before:left-0 before:rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      {character.description}
                    </motion.p>
                  ) : (
                    <motion.p 
                      className="text-justify italic relative pl-3 before:content-[''] before:absolute before:w-1 before:h-full before:bg-gradient-to-b before:from-[#ff7b75] before:to-[#e46167] before:left-0 before:rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      A mysterious character from the world of Teyvat. Their background and abilities are shrouded in mystery, waiting to be discovered.
                    </motion.p>
                  )}
                </motion.div>
              </motion.div>

              {/* Back Button */}
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={`/devices`}
                    className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors bg-gradient-to-r from-[#ff7b75] to-[#e46167] text-white shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Characters
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CharacterDetail;