import React from "react";
import "../../../styles/HoverButton.css";
type CustomButtonProps = {
  text: string;
  icon?: React.ReactNode;
  bgColorLeft?: string;
  bgColorRight?: string;
  onClick?: () => void;
};

const HoverButton = ({
  text,
  icon = "💬",
  bgColorLeft = "#0A3772",
  bgColorRight = "#875FD6",
  onClick,
}: CustomButtonProps) => {
  return (
    <ul className="ul" onClick={onClick}>
      <li
        style={
          {
            "--i": bgColorLeft,
            "--j": bgColorRight,
          } as React.CSSProperties
        }
      >
        <span className="icon">{icon}</span>
        <span className="title font-poppins">{text}</span>
      </li>
    </ul>
  );
};

export default HoverButton;
