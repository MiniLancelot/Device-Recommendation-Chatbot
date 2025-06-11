import { motion } from "framer-motion";
import classNames from "classnames";
import { useState } from "react";

interface TooltipProps {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

const Tooltip = ({ text, position = "top", children }: TooltipProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      id="id"
      className="relative cursor-pointer group"
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
    >
      <div>{children}</div>

      {/* Tooltip box */}
      <motion.span
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isHover ? 1 : 0, scale: isHover ? 1 : 0.95 }}
        transition={{ duration: 0.2, delay: isHover ? 0.1 : 0 }}
        className={classNames(
          "absolute bg-black text-white text-sm py-1 px-2 shadow-md whitespace-nowrap rounded z-10",
          position === "top"
            ? "left-1/2 -translate-x-1/2 bottom-[calc(100%+5px)]"
            : "",
          position === "bottom"
            ? "left-1/2 -translate-x-1/2 top-[calc(100%+5px)]"
            : "",
          position === "left"
            ? "top-1/2 -translate-y-1/2 right-[calc(100%+5px)]"
            : "",
          position === "right"
            ? "top-1/2 -translate-y-1/2 left-[calc(100%+5px)]"
            : ""
        )}
      >
        {text}
      </motion.span>

      {/* Mũi tên tooltip */}
      {/* <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isHover ? 1 : 0 }}
        transition={{ duration: 0.2, delay: isHover ? 0.1 : 0 }}
        className={classNames(
          "absolute border-[6px] z-0",
          position === "top"
            ? "left-1/2 -translate-x-1/2 bottom-full border-l-transparent border-r-transparent border-b-0 border-t-[#0D0D0D]"
            : "",
          position === "bottom"
            ? "left-1/2 -translate-x-1/2 top-full border-l-transparent border-r-transparent border-t-0 border-b-[#0D0D0D]"
            : "",
          position === "left"
            ? "top-1/2 -translate-y-1/2 right-full border-t-transparent border-b-transparent border-r-0 border-l-[#0D0D0D]"
            : "",
          position === "right"
            ? "top-1/2 -translate-y-1/2 left-full border-t-transparent border-b-transparent border-l-0 border-r-[#0D0D0D]"
            : ""
        )}
      ></motion.span> */}
    </motion.div>
  );
};

export default Tooltip;

// const Tooltip = ({ text, position, children }: TooltipProps) => {
//   const [isVisible, setIsVisible] = useState(false);

//   return (
//     <div
//       className="relative inline-block"
//       onMouseEnter={() => setIsVisible(true)}
//       onMouseLeave={() => setIsVisible(false)}
//     >
//       {children}

//       {isVisible && (
//         <div
//           className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
//                         bg-black text-white text-sm py-1 px-2 rounded shadow-md whitespace-nowrap"
//         >
//           {text}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tooltip;
