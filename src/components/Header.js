import React from 'react';
import Nav from './Nav';
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';

const Header = ({ title, screenWidth, search, setSearch }) => {
  return (
    <header>
      <h1>{title}</h1>
      {screenWidth < 768 ? <FaMobileAlt /> : screenWidth < 992 ? <FaTabletAlt /> : <FaLaptop />}

      {Nav && <Nav search={search} setSearch={setSearch} />}
    </header>
  );
};

export default Header;
