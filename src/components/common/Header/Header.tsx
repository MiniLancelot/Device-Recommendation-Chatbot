import Navbar from "../Navbar/Navbar";
const Header = () => {
  return (
    <header
      className={`bg-white transition-all flex flex-row justify-between items-center w-full px-2`}
    >
      <Navbar />
    </header>
  );
};

export default Header;
