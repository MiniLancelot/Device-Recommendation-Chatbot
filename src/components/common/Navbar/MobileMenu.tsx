import MobileMenuItem from "./MobileMenuItem";

type Props = {
  navLinks: { name: string; path: string }[];
  isOpen: boolean;
  activeIndex: number;
  hoverIndex: number | null;
  closeMobile: () => void;
  setActiveIndex: (index: number) => void;
  refs: React.RefObject<(HTMLAnchorElement | null)[]>;
  mobileIndicatorStyle: { width: number };
};

const MobileMenu = ({
  navLinks,
  isOpen,
  activeIndex,
  hoverIndex,
  closeMobile,
  setActiveIndex,
  refs,
  mobileIndicatorStyle,
}: Props) => (
  <div
    className={`fixed top-0 right-0 w-2/5 h-[100vh] bg-primary-color text-white transition-all duration-500 z-10 mt-19  ${
      isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    } lg:hidden`}
  >
    <div className="flex flex-col mt-20 space-y-6 pl-6">
      {navLinks.map((item, index) => (
        <MobileMenuItem
          key={index}
          to={item.path}
          label={item.name}
          isActive={activeIndex === index}
          isHovered={hoverIndex === index}
          onClick={() => {
            setActiveIndex(index);
            closeMobile();
          }}
          innerRef={(el) => (refs.current[index] = el)}
          indicatorStyle={mobileIndicatorStyle}
        />
      ))}
    </div>
  </div>
);

export default MobileMenu;
