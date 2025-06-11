import { LuSearch } from "react-icons/lu";
import NavItem from "./NavItem";

const Navbar = () => {
  return (
    <nav className="w-full py-6 px-10 flex items-end gap-x-6">
      <h1 className={`desc w-fit text-2xl lg:text-3xl font-bold`}>Techie</h1>

      <ul className="flex flex-1 items-center gap-2">
        <li>
          <NavItem to="/">Trang chủ</NavItem>
        </li>
        <li>
          <NavItem to="/test">Danh mục</NavItem>
        </li>
      </ul>

      <div className="relative w-90 inline-block">
        <input
          type="text"
          placeholder="Tìm kiếm nhanh"
          className="w-full bg-primary-color rounded-full pl-4 pr-10 py-2 focus:outline-none"
        />
        <LuSearch
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={20}
        />
      </div>
    </nav>
  );
};

export default Navbar;
