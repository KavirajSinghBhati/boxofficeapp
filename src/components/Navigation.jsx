import React from "react";
import { Link } from "react-router-dom";

const LINKS = [
  { to: "/", name: "Home" },
  { to: "/starred", name: "Starred" },
];

const Navigation = () => {
  return (
    <div>
      <ul>
        {LINKS.map(link => (
          <li key={link.to}>
            <Link to={link.to}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
