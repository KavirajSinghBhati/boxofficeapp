import React from "react";
import { useLocation } from "react-router-dom";

import { NavList, LinkStyled } from "./Navs.styled";

const LINKS = [
  { to: "/", name: "Home" },
  { to: "/starred", name: "Starred" },
];

const Navigation = () => {
  const location = useLocation();
  return (
    <div>
      <NavList>
        {LINKS.map(link => (
          <li key={link.to}>
            <LinkStyled
              to={link.to}
              className={link.to === location.pathname ? "active" : ""}
            >
              {link.name}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Navigation;
