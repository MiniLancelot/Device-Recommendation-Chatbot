import { Link } from "react-router-dom";

type Props = {
  to: string;
  label: string;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  innerRef: (el: HTMLAnchorElement | null) => void;
  indicatorStyle?: { width: number };
};

const MobileMenuItem = ({
  to,
  label,
  isActive,
  isHovered,
  onClick,
  innerRef,
  indicatorStyle,
}: Props) => (
  <div className="relative pb-2">
    <Link
      to={to}
      ref={innerRef}
      className={`menu-item desc text-lg lg:text-xl cursor-pointer transition-opacity ${
        isActive
          ? "text-primary-blue"
          : isHovered
          ? "text-primary-white-color opacity-100"
          : "text-primary-white-color opacity-75"
      }`}
      onClick={onClick}
    >
      {label}
      {isActive && (
        <div className="absolute bottom-0 left-0 flex h-[2px] transition-all duration-300 ease-in-out" style={indicatorStyle}>
          <div className="bg-blue-400 h-full flex-grow rounded-full" />
          <div className="bg-blue-400 h-full w-1 ml-1 rounded-full" />
        </div>
      )}
    </Link>
  </div>
);

export default MobileMenuItem;
