import React from 'react';
import Header from '../components/Header';
import './home.scss';
import { Link } from 'react-router-dom';

export default function Home () {
  return (
    <React.Fragment>
      <Header />
      <div className="container-ppal-menu">
        <div className="container-buttons">
          <Link to="/aves">
            <button className="menu-buttons birds pulse">
              <div className="menu-content">
                <h2>AVES</h2>
              </div>
            </button>
          </Link>

          <Link to="/mammals">
            <button className="menu-buttons mammals">
              <div className="menu-content">
                <h2>MAMÍFEROS</h2>
              </div>
            </button>
          </Link>

          <Link to="/plants">
          <button className="menu-buttons plants">
            <div className="menu-content">
              <h2>PLANTAS</h2>
            </div>
          </button>
          </Link>

          <Link to="/rocks">
            <button className="menu-buttons rocks" disabled>
              <div className="menu-content">
                <h2>ROCAS</h2>
              </div>
            </button>
          </Link>

          <Link to="/reptiles">
            <button className="menu-buttons reptiles">
              <div className="menu-content">
                <h2>REPTILES</h2>
              </div>
            </button>
          </Link>

          <Link to="/fishes">
            <button className="menu-buttons fish">
              <div className="menu-content">
                <h2>PECES</h2>
              </div>
            </button>
          </Link>

          <Link to="/amphibians">
            <button className="menu-buttons amphibians">
              <div className="menu-content">
                <h2>ANFIBIOS</h2>
              </div>
            </button>
          </Link>

          <Link to="/artropodos">
            <button className="menu-buttons arthropods">
              <div className="menu-content">
                <h2>ARTRÓPODOS</h2>
              </div>
            </button>
          </Link>

          <button className="menu-buttons minerals" disabled>
            <div className="menu-content">
              <h2>MINERALES</h2>
            </div>
          </button>

          <Link to="/invertebrates">
            <button className="menu-buttons cnidarios">
              <div className="menu-content">
                <h2>INV. NO ARTRÓPODOS</h2>
              </div>
            </button>
          </Link>

          <Link to="/fosiles">
            <button className="menu-buttons fossils">
              <div className="menu-content">
                <h2>FÓSILES</h2>
              </div>
            </button>
          </Link>

          <Link to="/exam">
            <button className="menu-buttons exam">
              <div className="menu-content">
                <h2>EXAMEN</h2>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}