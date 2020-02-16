import React from 'react';
import { Link } from 'react-router-dom'
import './header.scss';

function Header () {
  return (
    <div className="container-header">
      <Link to="/">
        <div className="header">
          {/* <i className="fas fa-arrow-left"></i> */}
          <h1 className="title">Visu Quiz</h1>
        </div>
      </Link>
    </div>
  );
}

export default Header;