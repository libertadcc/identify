import React from 'react';
import Header from '../components/Header';
import './exam.scss';
import { Button, InputGroup, FormControl, Col, Row } from 'react-bootstrap';

import { amphibians } from '../data/amphibians';
import { arthropods } from '../data/arthropods';
import { birds } from '../data/birds';
import { fishes } from '../data/fishes';
import { fossils } from '../data/fossils';
import { invert } from '../data/invert';
import { mammals } from '../data/mammals';
import { plants } from '../data/plants';
import { reptiles } from '../data/reptiles';
import { rocks } from '../data/rocks';

export default class GameModes extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }

  }

  render (){ 
  return (
    <React.Fragment>
      <Header />
      
    </React.Fragment>
  );
}
}