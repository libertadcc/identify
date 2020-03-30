import React from 'react';
import { Link } from 'react-router-dom'
import './header.scss';
import { Navbar, Dropdown, FormControl, Col, Row } from 'react-bootstrap';

function Header () {
  return (
    <div>
      <Navbar>
        <Navbar.Brand href="#"><h1 className="title">Visu Quiz</h1></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div className="dropdown">
            <button className="dropbtn"><i className="fas fa-user-alt"></i></button>
            <div className="dropdown-content">
              <a href="#"><i className="fas fa-lock"></i>Cerrar sesión</a>
              <a href="#reports"><i className="far fa-file-alt"></i>Informes</a>
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;