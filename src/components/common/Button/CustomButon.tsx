import React, { useState } from "react";
import "../../../styles/CustomButon.css";

type CustomButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  // mobileSize?: number;
  // desktopSize?: number;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const CustomButton = ({
  children,
  onClick,
  bgColor = "#efefef",
  borderColor = "#4d6eff",
  textColor = "#4d6eff",
  // mobileSize = 18,
  // desktopSize = 18,
  className = "",
  disabled = false,
  type = "button",
}: CustomButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button-hover ${isHovered ? "hover" : ""} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={
        {
          "--bg-color": bgColor,
          "--border-color": borderColor,
          "--text-color": textColor,
          "--rx-mo": 18,
          "--rx-pc": 18,
          "--rem-ratio": 1,
        } as React.CSSProperties
      }
    >
      <div className="bg"></div>
      <div className="content">{children}</div>
      <svg className="outline">
        <rect className="rect" rx="18" pathLength={700} />
      </svg>
    </button>
  );
};

export default CustomButton;
