import { LuMessageSquare } from "react-icons/lu";
import Tooltip from "../common/Tooltip/CustomToolTip";
import { motion } from "motion/react";
const FloatChatButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className="fixed bottom-6 right-6">
      <Tooltip position="top" text="Chat">
        <motion.button
          className="bg-gradient-to-r from-[#0A3772] to-[#875FD6] text-white p-3.5 rounded-full cursor-pointer"
          style={{
            boxShadow:
              "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
          }}
          initial={{ x: 0 }}
          whileHover={{
            x: [0, -2, 2, -2, 2, 0], // rung ngang
            transition: {
              duration: 0.4,
              ease: "easeInOut",
            },
          }}
          onClick={onClick}
        >
          <LuMessageSquare size={28} />
        </motion.button>
      </Tooltip>
    </div>
  );
};

export default FloatChatButton;
