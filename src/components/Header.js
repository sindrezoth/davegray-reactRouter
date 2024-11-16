import React from 'react';
import Nav from './Nav';

const Header = ({ title, search, setSearch }) => {

  return (
    <header>
      <h1>{title}</h1>

      {Nav && <Nav search={search} setSearch={setSearch} />}
    </header>
  );
};

export default Header;
