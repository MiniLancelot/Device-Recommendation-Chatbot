import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      const isVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`
        header fixed flex flex-row justify-between items-center top-0 left-0 right-0 w-full z-50 px-2 
        bg-white backdrop-blur-sm transition-transform duration-300 ease-in-out ${
          visible ? "" : "-translate-y-full"
        }`}
    >
      <Navbar />
    </header>
  );
};

export default Header;
