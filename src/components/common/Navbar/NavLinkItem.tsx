import { Link } from "react-router-dom";

type Props = {
  to: string;
  label: string;
  isActive: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
};

const NavLinkItem = ({ to, label, isActive, isHovered, onMouseEnter, onMouseLeave, onClick }: Props) => (
  <Link
    to={to}
    className={`menu-item desc text-lg lg:text-xl cursor-pointer transition-opacity 
      ${isActive ? "text-primary-dark-color" : isHovered ? "text-primary-grey-color opacity-100" : "text-primary-grey-color opacity-75"}
    `}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    {label}
  </Link>
);

export default NavLinkItem;
