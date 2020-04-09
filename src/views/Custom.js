import React from 'react';
import Header from '../components/Header';
import { Link, Route } from 'react-router-dom';
import './custom.scss';

import Exam from './Exam';

import './exam.scss';
import { Button, InputGroup, FormControl, Col, Row, Form } from 'react-bootstrap';

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

export default class Custom extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: [],
    }
    this.onChangeOption = this.onChangeOption.bind(this);
  }

  onChangeOption(event){
    if(event.target.checked === true) {
      this.setState(
        this.state.selected = this.state.selected.concat(event.target.name)
      )
    } else if (event.target.checked === false) {
      const array = this.state.selected;
      const updateArray = this.state.selected.filter((topic) => topic !== event.target.name);
      this.setState(
        this.state.selected = updateArray,
      )
    }

    console.log(this.state.selected);
  };

  render (){ 
  return (
    <React.Fragment>
      <Header />
      <div className="container-custom">
      <h3>Elige los temas: </h3>
        <Form>
          <Form.Check className="option" label="Aves" type="checkbox" 
            name="birds"
            onClick={this.onChangeOption} 
            defaultChecked={false}/>
          <Form.Check className="option" label="Mamíferos" type="checkbox" 
            name="mammals"  
            onClick={this.onChangeOption} 
            defaultChecked={false}/>
          <Form.Check className="option" label="Plantas" type="checkbox" 
            name="plants" 
            onClick={this.onChangeOption} 
            defaultChecked={false}/>
          <Form.Check className="option" label="Rocas" type="checkbox" 
            name="rocks" 
            onClick={this.onChangeOption} 
            defaultChecked={false}/>
          <Form.Check className="option" label="Reptiles" type="checkbox" 
            name="reptils" 
            onClick={this.onChangeOption} 
            defaultChecked={false}/>
          <Form.Check className="option" label="Peces" type="checkbox" 
            name="fishes" 
            onClick={this.onChangeOption} 
            defaultChecked={false}/>
          <Form.Check className="option" label="Anfibios" type="checkbox" 
            name="amphibians" 
            onClick={this.onChangeOption} 
            defaultChecked={false}/>
          <Form.Check className="option" label="Artrópodos" type="checkbox" 
            name="arthropods" 
            onClick={this.onChangeOption} 
            defaultChecked={false}/>
          <Form.Check className="option" label="Inv. no artrópodos" type="checkbox" 
            name="invert" 
            onClick={this.onChangeOption} 
            defaultChecked={false}/>
          <Form.Check className="option" label="Fósiles" type="checkbox" 
            name="fossils" 
            onClick={this.onChangeOption} 
            defaultChecked={false}/>
          <Link to={{
              pathname: "/exam",
              state: { selected: this.state.selected }
            }}>
            <Button className="button-custom" variant="outline-info">
              Empezar examen</Button>
          </Link>

          {/* Como pasar esto por props!?!?!?!?!??! */}
          <Route
            path="/exam"
            render={() => <Exam />}
          />
      </Form>
      </div>
    </React.Fragment>
  );
}
}