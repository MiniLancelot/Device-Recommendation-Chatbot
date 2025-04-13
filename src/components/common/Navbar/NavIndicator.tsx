type Props = {
    style: { width: number; left: number };
  };
  
  const NavIndicator = ({ style }: Props) => (
    <div
      className="absolute bottom-[-0.2rem] lg:bottom-[-0.4rem] flex items-center h-[2px] transition-all duration-900 ease-in-out"
      style={style}
    >
      <div className="bg-blue-400 h-full flex-grow rounded-full" />
      <div className="bg-blue-400 h-full w-1 ml-1 rounded-full" />
    </div>
  );
  
  export default NavIndicator;
  