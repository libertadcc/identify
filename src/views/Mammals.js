import React from 'react';
import Header from '../components/Header';
import { mammals } from '../data/mammals.js';
import './aves.scss';

let gData = [];
let gPercentage;
let gStackQuestions;
let gCurrentIndex = 0;
let gCorrectAnswerIndex = 0;
let gNumberOfCorrectAnswers = 0;

export default class Aves extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mammalsList: mammals
    }
    this.init = this.init.bind(this);
    this.clickOnAnswer1 = this.clickOnAnswer1.bind(this);
    this.clickOnAnswer2 = this.clickOnAnswer2.bind(this);
    this.clickOnAnswer3 = this.clickOnAnswer3.bind(this);
    this.clickOnAnswer4 = this.clickOnAnswer4.bind(this);
  }

  init() {
    gData = this.state.mammalsList;
    gStackQuestions = this.shuffle(gData);
    this.createQuestion();    
  }
  
  componentDidMount() {
    this.init();
  }
  


  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
    // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  getNextCandidate(listCandidates, correctAnswer) {
    let found = false;
    let nextCandidate = "";
    while (!found) {
      let randomIndex = Math.floor(Math.random() * gData.length);
      nextCandidate = gData[randomIndex].a;
      if (nextCandidate !== correctAnswer && listCandidates.indexOf(nextCandidate) === -1) {
        found = true;
        listCandidates.push(nextCandidate);
      }
    }
    return nextCandidate;
  }
  

  createQuestion() {
    let selectedQuestion = gStackQuestions[gCurrentIndex];
    document.getElementById("imgQuestion").setAttribute('src', selectedQuestion.q)
  
    let listCandidates = [];
    gCorrectAnswerIndex = Math.floor(Math.random() * 4) + 1;
  
    for (let i = 1; i < 5; ++i) {
      let tempAnswer = null;
      if (i === gCorrectAnswerIndex) {
        tempAnswer = selectedQuestion.a;
      } else {
        tempAnswer = this.getNextCandidate(listCandidates, selectedQuestion.a);
      }
      document.getElementById("answer" + i).innerHTML = tempAnswer;
    }
  }

  createSpanResult(text, isCorrect) {
    var spanAnswer = document.createElement('span')
    spanAnswer.innerHTML = text;
    spanAnswer.setAttribute('class', isCorrect ? "correctAnswer" : "incorrectAnswer");
    document.getElementById("divResultsSpan").appendChild(spanAnswer);
  }
  
  clickOnAnswer1() {
    console.log('click on answer1')
    let clickedBtn = "answer1";
    let clickedButton = clickedBtn.substr(clickedBtn.length - 1);
    let isCorrectAnswer = gCorrectAnswerIndex === clickedButton;
    let text = (gCurrentIndex + 1).toString() + ". ";
    text += (isCorrectAnswer ? gStackQuestions[gCurrentIndex].a : document.getElementById(clickedBtn).innerHTML);
  
    this.createSpanResult(text, isCorrectAnswer);
  
    if (isCorrectAnswer) {
      ++gNumberOfCorrectAnswers;
    }
    ++gCurrentIndex;
    this.createQuestion();
  
    gPercentage = (gNumberOfCorrectAnswers / gCurrentIndex) * 100.0;
    gPercentage = Math.round(gPercentage * 100) / 100;
    document.getElementById("idResultsPercentage").innerHTML = "Resultados: " + gPercentage + "%";
  }
  clickOnAnswer2() {
    console.log('click on answer2')
    let clickedBtn = "answer2";
    let clickedButton = clickedBtn.substr(clickedBtn.length - 1);
    let isCorrectAnswer = gCorrectAnswerIndex === clickedButton;
    let text = (gCurrentIndex + 1).toString() + ". ";
    text += (isCorrectAnswer ? gStackQuestions[gCurrentIndex].a : document.getElementById(clickedBtn).innerHTML);
  
    this.createSpanResult(text, isCorrectAnswer);
  
    if (isCorrectAnswer) {
      ++gNumberOfCorrectAnswers;
    }
    ++gCurrentIndex;
    this.createQuestion();
  
    gPercentage = (gNumberOfCorrectAnswers / gCurrentIndex) * 100.0;
    gPercentage = Math.round(gPercentage * 100) / 100;
    document.getElementById("idResultsPercentage").innerHTML = "Resultados: " + gPercentage + "%";
  }
  clickOnAnswer3() {
    console.log('click on answer3')
    let clickedBtn = "answer3";
    let clickedButton = clickedBtn.substr(clickedBtn.length - 1);
    let isCorrectAnswer = gCorrectAnswerIndex === clickedButton;
    let text = (gCurrentIndex + 1).toString() + ". ";
    text += (isCorrectAnswer ? gStackQuestions[gCurrentIndex].a : document.getElementById(clickedBtn).innerHTML);
  
    this.createSpanResult(text, isCorrectAnswer);
  
    if (isCorrectAnswer) {
      ++gNumberOfCorrectAnswers;
    }
    ++gCurrentIndex;
    this.createQuestion();
  
    gPercentage = (gNumberOfCorrectAnswers / gCurrentIndex) * 100.0;
    gPercentage = Math.round(gPercentage * 100) / 100;
    document.getElementById("idResultsPercentage").innerHTML = "Resultados: " + gPercentage + "%";
  }
  clickOnAnswer4() {
    console.log('click on answer4')
    let clickedBtn = "answer4";
    let clickedButton = clickedBtn.substr(clickedBtn.length - 1);
    let isCorrectAnswer = gCorrectAnswerIndex === clickedButton;
    let text = (gCurrentIndex + 1).toString() + ". ";
    text += (isCorrectAnswer ? gStackQuestions[gCurrentIndex].a : document.getElementById(clickedBtn).innerHTML);
  
    this.createSpanResult(text, isCorrectAnswer);
  
    if (isCorrectAnswer) {
      ++gNumberOfCorrectAnswers;
    }
    ++gCurrentIndex;
    this.createQuestion();
  
    gPercentage = (gNumberOfCorrectAnswers / gCurrentIndex) * 100.0;
    gPercentage = Math.round(gPercentage * 100) / 100;
    document.getElementById("idResultsPercentage").innerHTML = "Resultados: " + gPercentage + "%";
  }

  render (){ 
  return (
    <React.Fragment>
      <Header />
      <main className="main">
        <img 
          alt="Foto de especie"
          id="imgQuestion"
          className="imgQuestion">
        </img>
        <div className="container-options">
          <div id="idAnswers" className="divGeneral divAnswers">
            <button 
              id="answer1" 
              className="btnAnswer" 
              title="Key 1"
              onClick={this.clickOnAnswer1}>
              1
            </button>
            <button 
              id="answer2" 
              className="btnAnswer" 
              title="Key 2" 
              onClick={this.clickOnAnswer2}>
              2
            </button>
            <button 
              id="answer3" 
              className="btnAnswer" 
              title="Key 3"
              onClick={this.clickOnAnswer3} >
              3
            </button>
            <button 
              id="answer4" 
              className="btnAnswer" 
              title="Key 4" 
              onClick={this.clickOnAnswer4}>
              4
            </button>
          </div>
        </div>
        <div id="idDivResults" className="divGeneral divResults">
          <div id="idTitleResults">
            <span 
            className="idResultsPercentage" 
            id="idResultsPercentage">
              Resultados %
            </span>
          </div>
          <div id="divResultsSpan"></div>
        </div>
      </main>
    </React.Fragment>
  );
}
}