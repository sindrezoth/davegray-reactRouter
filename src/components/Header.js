import React from 'react';
import Nav from './Nav';
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = ({ title, screenWidth }) => {
  return (
    <header>
      <Link to="/">
        <h1>{title}</h1>
      </Link>
      {screenWidth < 768 ? <FaMobileAlt /> : screenWidth < 992 ? <FaTabletAlt /> : <FaLaptop />}

      {Nav && <Nav />}
    </header>
  );
};

export default Header;
