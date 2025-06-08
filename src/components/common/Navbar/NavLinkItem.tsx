import { Link } from "react-router-dom";

type Props = {
  to: string;
  label: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
};

const NavLinkItem = ({
  to,
  label,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: Props) => (
  <Link
    to={to}
    className={`menu-item desc text-lg lg:text-xl cursor-pointer transition-opacity font-semibold
      ${isHovered ? "text-primary-blue opacity-100" : ""}
    `}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    {label}
  </Link>
);

export default NavLinkItem;
