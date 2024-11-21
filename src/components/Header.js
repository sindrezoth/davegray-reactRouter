import Nav from './Nav';
import React, { useContext } from 'react';
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import useWindowSize from '../hooks/useWindowSize';
import { Link } from 'react-router-dom';

const Header = () => {
  const { width } = useWindowSize();

  return (
    <header>
      <Link to="/">
        <h1 style={{color: '#111'}}>ReactJS Blog</h1>
      </Link>
      {width < 768 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt /> : <FaLaptop />}

      {Nav && <Nav />}
    </header>
  );
};

export default Header;
