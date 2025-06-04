import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/common/Header/Header";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";
import { useNavStore } from "../../stores/store";
import Footer from "../../components/common/Footer/Footer";
import { useState } from "react";
import MiniChatbox from "../../components/Chat/MiniChatbox";
import { LuMessageSquare } from "react-icons/lu";
import HoverButton from "../../components/common/Button/HoverButton";

const MainLayout = () => {
  const { isMobileOpen, closeMobile } = useNavStore();
  const location = useLocation();
  const isHomePage = location.pathname !== "/";
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="main-container w-full min-h-screen flex flex-col items-center bg-primary-color">
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 bg-opacity-50 backdrop-blur-md z-30"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={closeMobile}
          />
        )}
      </AnimatePresence>

      <Header />
      <Outlet />
      {isHomePage && (
        <AnimatePresence mode="wait">
          {showChat && (
            <MiniChatbox key="chatbox" onClose={() => setShowChat(false)} />
          )}
          {!showChat && (
            <motion.div
              className="fixed bottom-6 right-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HoverButton
                text="Hỏi Techie"
                icon={<LuMessageSquare />}
                onClick={() => setShowChat(true)}
              />
              {/* <FloatChatButton onClick={() => setShowChat(true)} /> */}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {isHomePage && <Footer />}
    </div>
  );
};

export default MainLayout;
