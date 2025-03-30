import { useState } from "react";

const Tooltip = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                        bg-black text-white text-sm py-1 px-2 rounded shadow-md whitespace-nowrap"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
