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

const NavLinkItem = ({
  to,
  label,
  isActive,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: Props) => (
  <Link
    to={to}
    className={`menu-item desc text-lg lg:text-xl cursor-pointer transition-opacity 
      ${
        isActive
          ? "text-primary-text-gray font-bold"
          : isHovered
          ? "text-secondary-text-gray opacity-100"
          : "text-secondary-text-gray opacity-75"
      }
    `}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    {label}
  </Link>
);

export default NavLinkItem;
