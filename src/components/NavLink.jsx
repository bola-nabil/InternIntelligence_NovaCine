import React from "react";
import {
  faFire,
  faClapperboard,
  faTv,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavLink = () => {
  const location = useLocation();
  const links = [
    { id: 1, path: "/", title: "Trending", icon: faFire },
    { id: 2, path: "/movies", title: "Movies", icon: faClapperboard },
    { id: 3, path: "/series", title: "TV Series", icon: faTv },
    { id: 4, path: "/search", title: "Search", icon: faMagnifyingGlass },
  ];
  return (
    <div>
      {links.map((link) => (
        <div
          key={link.path}
          className={location.pathname === link.path ? "active" : ""}
        >
          <Link to={link.path}>
            <div className="home-icon">
              <FontAwesomeIcon icon={link.icon} />
            </div>
            {link.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NavLink;
