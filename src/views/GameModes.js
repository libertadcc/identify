import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import './modes.scss';

export default class GameModes extends React.Component {
  constructor(){
    super();

    this.checkUserLogged = this.checkUserLogged.bind(this)
  }

  checkUserLogged() {
    if (sessionStorage.getItem('userToken') === null){
      this.props.history.push('/login')
    }
  }

  componentDidMount () {
    this.checkUserLogged();
  }

  render (){ 
  return (
    <React.Fragment>
      <Header />
      <div className="container-ppal-mode">
        <div className="container-buttons-mode">
          <Link to="/home">
            <button className="mode-buttons">
              <div className="mode-content">
                <h2 className="mode-title">EJERCICIOS</h2>
              </div>
            </button>
          </Link>

          <Link to="/custom">
            <button className="mode-buttons">
              <div className="mode-content">
                <h2 className="mode-title">EXAMEN</h2>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
}