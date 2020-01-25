import React from 'react';
import { Link } from 'react-router-dom'
import './header.scss';

function Header () {
  return (
    <div className="container-header">
      <Link to="/">
        <h1 className="title">
          Visu Quiz
        </h1>
      </Link>
    </div>
  );
}

export default Header;