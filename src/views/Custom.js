import React from 'react';
import Header from '../components/Header';
import { Link, Route } from 'react-router-dom';
import './custom.scss';

// MATERIAL UI
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Exam from './Exam';

import './exam.scss';
import { Button, Form } from 'react-bootstrap';

export default class Custom extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: [],
    }
    this.onChangeOption = this.onChangeOption.bind(this);
    this.checkUserLogged = this.checkUserLogged.bind(this);
  }

  checkUserLogged() {
    if (sessionStorage.getItem('userToken') === null){
      return this.props.history.push('/login')
    }
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
  };

  componentDidMount() {
    this.checkUserLogged();
  }

  render (){ 
  return (
    <React.Fragment>
      <Header />
      <div className="container-custom">
      <h3>Elige los temas: </h3>
      <div className="container-topics">
        <FormControlLabel
          label="Aves"
          control={
            <Checkbox 
              value="birds"
              className="btn-remember" 
              name="birds"
              onClick={this.onChangeOption}/>}/>
        <FormControlLabel
          label="Mamíferos"
          control={
            <Checkbox 
              value="mammals"
              className="btn-remember" 
              onClick={this.onChangeOption} 
              name="mammals"/>}/>
        <FormControlLabel
          label="Plantas"
          control={
            <Checkbox 
              value="plants"
              className="btn-remember" 
              onClick={this.onChangeOption} 
              name="plants"/>}/>
        <FormControlLabel
          label="Rocas"
          control={
            <Checkbox 
              value="rocks"
              className="btn-remember" 
              onClick={this.onChangeOption} 
              name="rocks"/>}/>
        <FormControlLabel
          label="Reptiles"
          control={
            <Checkbox 
              value="reptils"
              className="btn-remember" 
              onClick={this.onChangeOption} 
              name="reptils"/>}/>
        <FormControlLabel
          label="Peces"
          control={
            <Checkbox 
              value="fishes"
              className="btn-remember" 
              onClick={this.onChangeOption} 
              name="fishes"/>}/>
        <FormControlLabel
          label="Anfibios"
          control={
            <Checkbox 
              value="amphibians"
              className="btn-remember" 
              onClick={this.onChangeOption} 
              name="amphibians"/>}/>
        <FormControlLabel
          label="Artrópodos"
          control={
            <Checkbox 
              value="arthropods"
              className="btn-remember" 
              onClick={this.onChangeOption} 
              name="arthropods"/>}/>
        <FormControlLabel
          label="Inv. no artrópodos"
          control={
            <Checkbox 
              value="invert"
              className="btn-remember" 
              onClick={this.onChangeOption} 
              name="invert"/>}/>
        <FormControlLabel
          label="Fósiles"
          control={
            <Checkbox 
              value="fossils"
              className="btn-remember" 
              onClick={this.onChangeOption} 
              name="fossils"/>}/>
      </div>
      <Link to={{
        pathname: "/exam",
        state: { selected: this.state.selected }
      }}>
        <Button className="button-custom" variant="info" disabled={this.state.selected.length === 0}>Empezar examen</Button>
      </Link>
      <Route path="/exam" render={() => <Exam />}/>
      </div>
    </React.Fragment>
  );
}
}