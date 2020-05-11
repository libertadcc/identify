import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './header.scss';
import { Navbar } from 'react-bootstrap';
import { withFirebaseHOC } from './Firebase'
import firebase from 'firebase';


export default class Header extends React.Component {
  constructor(){
    super();
    this.signOutUser = this.signOutUser.bind(this);
  }

  signOutUser = async () => {
    try {
      console.log('out', this)
      await firebase.auth().signOut();
      sessionStorage.clear();
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Brand href="#"><h1 className="title">Visu Quiz</h1></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <div className="dropdown">
              <button className="dropbtn"><i className="fas fa-user-alt"></i></button>
              <div className="dropdown-content">
                <Link to="/login">
                  <p onClick={this.signOutUser}><i className="fas fa-lock"></i>Cerrar sesión</p>
                </Link>
                <a href="#reports"><i className="far fa-file-alt"></i>Informes</a>
              </div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}