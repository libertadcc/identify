import React from 'react';
import Header from '../components/Header';
import './reports.scss';

import { withFirebaseHOC } from '../components/Firebase';

// CIRCULAR PROGRESS BAR
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

let reportsList = []; 
let percentage = 0;

class Reports extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listResults: [],
      percentage: 0
    };
    this.click = this.click.bind(this);
    this.getPercentageSuccess = this.getPercentageSuccess.bind(this);
    this.displayMoreInfo = this.displayMoreInfo.bind(this);
  }

  async click () {
    const userId = sessionStorage.getItem('userToken');
    const response = await this.props.firebase.getExercisesByUserId(userId);
    if (response) {
      console.log("Ya hemos recibido la información en response.docs. Hay estos elementos: " + response.docs.length);
      response.docs.forEach(function (doc) {
        console.log(doc.id, ' => ', doc.data());
        if(doc.data() !== undefined) {
          reportsList.push(doc.data());
        }
      });
    }
    this.setState({listResults: reportsList})
  }

  getPercentageSuccess(correctas, incorrectas) {
    console.log(this.state.listResults);
    let total = correctas.length + incorrectas.length;
    let correctasN = correctas.length;
    let incorrectasN = incorrectas.length;
    console.log('total', total);
    percentage = total;
    percentage = Math.round(( correctasN * 100 ) / total);
    // return total;
    return percentage;
  }

  displayMoreInfo(e) {
    const container = e.currentTarget.querySelector('.container-report');
    const arrowDown = e.currentTarget.querySelector('.fa-chevron-down');
    const arrowUp = e.currentTarget.querySelector('.fa-chevron-up');

    if (container.classList.contains('hidden')) {
      container.classList.remove('hidden');
      arrowDown.classList.add('hidden');
      arrowUp.classList.remove('hidden');
    } else {
      container.classList.add('hidden');
      arrowDown.classList.remove('hidden');
      arrowUp.classList.add('hidden');
    }
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
        <ul className="principal-list">{this.state.listResults.map((exercise, index) => {
          return (
            <div key={index} className="wrapper-report" onClick={this.displayMoreInfo}>
              
              <div className="header-report">
                <div>
                  <p>{exercise.date}</p>
                </div>

                <div>
                  <p>Aciertos: {this.getPercentageSuccess(exercise.corrects || [], exercise.incorrects || [])}%</p>
                </div>
                <i className="fas fa-chevron-down"></i>
                <i className="fas fa-chevron-up hidden"></i>
              </div>

              <div className="container-report hidden">
                <div>
                  <p className="report-title">Temas elegidos:</p>
                  <ul>{exercise.topics.map((topic, index) => {
                      {if(topic === 'birds') {return <li key={index}>Aves</li>}}
                      {if(topic === 'mammals') {return <li key={index}>Mamíferos</li>}}
                      {if(topic === 'mammals') {return <li key={index}>Mamíferos</li>}}
                      {if(topic === 'plants') {return <li key={index}>Plantas</li>}}
                      {if(topic === 'rocks') {return <li key={index}>Rocas</li>}}
                      {if(topic === 'reptils') {return <li key={index}>Reptiles</li>}}
                      {if(topic === 'fishes') {return <li key={index}>Peces</li>}}
                      {if(topic === 'amphibians') {return <li key={index}>Anfibios</li>}}
                      {if(topic === 'arthropods') {return <li key={index}>Artrópodos</li>}}
                      {if(topic === 'invert') {return <li key={index}>Inv. no artrópodos</li>}}
                      {if(topic === 'fossils') {return <li key={index}>Fósiles</li>}}
                    })}</ul>
                </div>
                <div className="container-graph">
                  <div style={{ width: "50%", padding: "20px 20px 40px 20px" }}>
                    <CircularProgressbar
                      value={percentage} 
                      text={`${percentage}%`} 
                      />
                  </div>  
                </div>

                <div>
                  <p className="report-title">Respuestas correctas:</p>
                  <ul>{exercise.corrects.map((answer, index) => {
                    return <li key={index}>{answer}</li>
                  })}</ul>
                </div>

                <div>
                  <p className="report-title">Respuestas incorrectas:</p>
                  <ul>{exercise.incorrects.map((answer, index) => {
                    return <li key={index}>{answer}</li>
                  })}</ul>
                </div>

                
              </div>
            </div>
          );
        })}
        </ul>
      </main>
    </React.Fragment>);
  }
}

export default withFirebaseHOC(Reports)