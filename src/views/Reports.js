import React from 'react';
import Header from '../components/Header';
import './aves.scss';

import { withFirebaseHOC } from '../components/Firebase'

class Reports extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listResults: []
    };
    this.click = this.click.bind(this);
  }

  async click () {
    let hola = []; 
    console.log('click');
    const userId = sessionStorage.getItem('userToken');
    const response = await this.props.firebase.getExercisesByUserId(userId);
    if (response) {
      console.log("Ya hemos recibido la información en response.docs. Hay estos elementos: " + response.docs.length);
      response.docs.forEach(function (doc) {
        console.log(doc.id, ' => ', doc.data());
        if(doc.data() !== undefined) {
          hola.push(doc.data());
        }
      });
    }
    console.log(hola)
    this.setState({listResults: hola})
  }

  componentDidMount() {
    this.click();
  }

  render () {  
    return (
    <React.Fragment>
      <Header />
      <main className="main">
        <h3>Informes</h3>
        <ul>{this.state.listResults.map((exercise, index) => {
          return (<li key={index}>{exercise.date}</li>);
        })}
        </ul>
      </main>
    </React.Fragment>);
  }
}

export default withFirebaseHOC(Reports)