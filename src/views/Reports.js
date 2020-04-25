import React from 'react';
import Header from '../components/Header';
import './aves.scss';


export default class Aves extends React.Component {
  render (){ 
  return (
    <React.Fragment>
      <Header />
      <main className="main">
        <h3>Informes</h3>
      </main>
    </React.Fragment>
  );
}
}