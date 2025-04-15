import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/common/Header/Header";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";
import { useNavStore } from "../../stores/store";
import Footer from "../../components/common/Footer/Footer";

const MainLayout = () => {
  const { isMobileOpen, closeMobile } = useNavStore();
  const location = useLocation();
  const isFooterRequired = location.pathname !== "/";

  // const headerRef = useRef<HTMLElement>(null);
  // const [headerHeight, setHeaderHeight] = useState(0);

  // useLayoutEffect(() => {
  //   if (headerRef.current) {
  //     setHeaderHeight(headerRef.current.offsetHeight);
  //   }
  // }, []);
  return (
    <div
      className="main-container w-full min-h-screen flex flex-col items-center bg-primary-color" // Maybe add 'relative' class to the main container
    >
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

      {/* <Header ref={headerRef} /> */}
      <Header />
      {/* <div style={{ paddingTop: headerHeight }} className="w-full"> */}
      <Outlet />
      {/* </div> */}

      {isFooterRequired && <Footer />}
    </div>
  );
};

export default MainLayout;
