import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `desc text-lg p-4 ${
          isActive ? "font-bold" : "font-normal text-primary-grey-color"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
