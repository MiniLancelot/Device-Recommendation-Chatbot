type Props = {
  style: { width: number; left: number };
};

const NavIndicator = ({ style }: Props) => (
  <div
    className="absolute bottom-[-0rem] lg:bottom-[-0rem] flex items-center h-[2px] transition-all duration-900 ease-in-out"
    style={style}
  >
    <div className="bg-primary-purple h-full flex-grow rounded-full" />
    <div className="bg-primary-purple  h-full w-1 ml-1 rounded-full" />
  </div>
);

export default NavIndicator;
