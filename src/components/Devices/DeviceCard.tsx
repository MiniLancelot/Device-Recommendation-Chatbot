// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useState } from "react";

// type CharacterCardProps = {
//   character: {
//     name: string;
//     characterName: string;
//     weapon: string;
//     vision?: string;
//     card: string;
//   };
//   index: number;
// };

// // Animation variants
// const cardVariants = {
//   initial: {
//     scale: 1,
//     boxShadow:
//       "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//   },
//   hover: {
//     scale: 1.03,
//     boxShadow:
//       "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//     transition: { duration: 0.3 },
//   },
// };

// const imageVariants = {
//   initial: { scale: 1 },
//   hover: {
//     scale: 1.15,
//     transition: { duration: 0.5 },
//   },
// };

// const textVariants = {
//   initial: { y: 0 },
//   hover: {
//     y: -5,
//     transition: { duration: 0.3 },
//   },
// };

// const shimmerVariants = {
//   initial: {
//     backgroundPosition: "-500px 0",
//   },
//   animate: {
//     backgroundPosition: "500px 0",
//     transition: {
//       repeat: Infinity,
//       duration: 1.5,
//       ease: "linear",
//     },
//   },
// };

// const CharacterCard = ({ character, index }: CharacterCardProps) => {
//   // State to track if image is loaded
//   const [imageLoaded, setImageLoaded] = useState(false);

//   return (
//     <Link
//       key={character.name}
//       to={`/characters/${character.name}`}
//       className="block rounded-lg overflow-hidden h-64 relative"
//     >
//       <motion.div
//         className="absolute inset-0 w-full h-full rounded-lg overflow-hidden"
//         variants={cardVariants}
//         initial={{
//           opacity: 0,
//           y: 20,
//           scale: 1,
//           boxShadow:
//             "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           boxShadow:
//             "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//         }}
//         whileHover="hover"
//         transition={{
//           duration: 0.3,
//           delay: index * 0.1,
//         }}
//       >
//         {/* Loading shimmer effect */}
//         {!imageLoaded && (
//           <motion.div
//             className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#f0f0f0] via-[#fafafa] to-[#f0f0f0] bg-[length:1000px_100%]"
//             variants={shimmerVariants}
//             initial="initial"
//             animate="animate"
//           >
//             <div className="h-full w-full flex items-center justify-center">
//               <motion.div 
//                 className="text-[#ff7b75] opacity-90"
//                 animate={{ 
//                   opacity: [0.5, 1, 0.5],
//                   scale: [0.98, 1.02, 0.98],
//                 }}
//                 transition={{ 
//                   repeat: Infinity, 
//                   duration: 1.5,
//                   ease: "easeInOut",
//                 }}
//               >
//                 {character.characterName}
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
        
//         <motion.div className="w-full h-full overflow-hidden">
//           <motion.img
//             src={character.card}
//             alt={character.characterName}
//             className="w-full h-full object-cover object-center"
//             variants={imageVariants}
//             initial={{ opacity: 0 }}
//             animate={{ 
//               opacity: imageLoaded ? 1 : 0,
//             }}
//             transition={{ 
//               opacity: { duration: 0.5 },
//             }}
//             onLoad={() => setImageLoaded(true)}
//             onError={(e) => {
//               e.currentTarget.src = "https://via.placeholder.com/300x450?text=Character";
//               setImageLoaded(true);
//             }}
//           />
//         </motion.div>
        
//         {/* Dark gradient overlay for readability */}
//         {imageLoaded && (
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
//         )}

//         {/* Character info */}
//         {imageLoaded && (
//           <motion.div
//             className="absolute bottom-0 left-0 right-0 p-5 text-white z-10"
//             variants={textVariants}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ 
//               duration: 0.3,
//               delay: 0.2,
//             }}
//           >
//             <h2 className="text-xl font-bold mb-2">{character.characterName}</h2>
//             <div className="flex items-center gap-2 text-gray-200">
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M18 12H6"
//                 />
//               </svg>
//               <span>Weapon: {character.weapon}</span>
//             </div>
//             {character.vision && (
//               <div className="mt-2 flex items-center gap-2 text-gray-200">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                   />
//                 </svg>
//                 <span>Vision: {character.vision}</span>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </motion.div>
//     </Link>
//   );
// };

// export default CharacterCard;


import { motion } from "framer-motion"
import { Link } from "react-router-dom";

import { DeviceBasicInfoProps } from "../../types/DeviceBasicInfo"

interface DeviceCardProps {
  device: DeviceBasicInfoProps
  index: number
}

const DeviceCard = ({ device, index }: DeviceCardProps) => {
  return (
    <Link
      key={device.name}
      to={`/devices/${device.name}`}
    >
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
        style={{ originX: 0, originY: 0 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <div className="flex-1 overflow-hidden">
          <img
            src={"src/assets/images/iphone-16-pro-max.webp"} //  || character.card
            alt={device.characterName}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-2 sm:p-3 md:p-4">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
            {device.characterName}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">Weapon: {device.weapon}</p>
          {device.vision && (
            <p className="text-xs sm:text-sm text-gray-600">Vision: {device.vision}</p>
          )}
        </div>
      </motion.div>
    </Link>
  )
}

export default DeviceCard