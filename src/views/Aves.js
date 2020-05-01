import React from 'react';
import Header from '../components/Header';
import { Image } from '../components/Image';
import { Results } from '../components/Results';
import { ShowResult } from '../components/ShowResult';
import { birds } from '../data/birds.js';
import './aves.scss';

import { Button } from 'react-bootstrap';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
      birdsList: birds,
      correctAnswerArray: [],
      incorrectAnswerArray: [],
      percentage: 0,
    }
    this.init = this.init.bind(this);
    this.clickOnAnswer1 = this.clickOnAnswer1.bind(this);
    this.clickOnAnswer2 = this.clickOnAnswer2.bind(this);
    this.clickOnAnswer3 = this.clickOnAnswer3.bind(this);
    this.clickOnAnswer4 = this.clickOnAnswer4.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
    this.checkUserLogged = this.checkUserLogged.bind(this);
  }

  init() {
    gData = this.state.birdsList;
    gStackQuestions = this.shuffle(gData);
    this.createQuestion();    
  }

  checkUserLogged() {
    if (sessionStorage.getItem('userToken') === null){
      return this.props.history.push('/login')
    }
  }
  
  componentDidMount() {
    this.checkUserLogged();
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
    var spanAnswer = document.createElement('span');
    spanAnswer.innerHTML = text;
    spanAnswer.setAttribute('className', isCorrect ? "correctAnswer" : "incorrectAnswer");
    
    if(isCorrect === true) {
      this.setState(
        this.state.correctAnswerArray = this.state.correctAnswerArray.concat(text)
      )
    } else {
      this.setState (
        this.state.incorrectAnswerArray = this.state.incorrectAnswerArray.concat(text)
      )
    }   
  }

  getAnswer (clickedButton, clickedBtn) {
    let isCorrectAnswer = gCorrectAnswerIndex === clickedButton;
    let text = (gCurrentIndex + 1).toString() + ". ";
    text += (isCorrectAnswer ? gStackQuestions[gCurrentIndex].a : document.getElementById(clickedBtn).innerHTML);

    let element = document.getElementById(clickedBtn);
    if(isCorrectAnswer) {
      element.classList.add('correct-answer');
      setTimeout(function () {
        element.classList.remove('correct-answer');
      }, 400);
    } else {
      element.classList.add('incorrect-answer');
      setTimeout(function () {
        element.classList.remove('incorrect-answer');
      }, 400);
    }

    this.createSpanResult(text, isCorrectAnswer);
  
    if (isCorrectAnswer) {
      ++gNumberOfCorrectAnswers;
    }
    ++gCurrentIndex;
    setTimeout(function () { this.createQuestion();}.bind(this),
      800);
  
    gPercentage = (gNumberOfCorrectAnswers / gCurrentIndex) * 100.0;
    gPercentage = Math.round(gPercentage * 100) / 100;
    this.setState({percentage: gPercentage})
  }

  clickOnAnswer1() {
    let clickedBtn = "answer1";
    let clickedButton = parseInt(clickedBtn.substr(clickedBtn.length - 1));
    this.getAnswer(clickedButton, clickedBtn);
  }

  clickOnAnswer2() {
    let clickedBtn = "answer2";
    let clickedButton = parseInt(clickedBtn.substr(clickedBtn.length - 1));
    this.getAnswer(clickedButton, clickedBtn);
  }

  clickOnAnswer3() {
    let clickedBtn = "answer3";
    let clickedButton = parseInt(clickedBtn.substr(clickedBtn.length - 1));
    this.getAnswer(clickedButton, clickedBtn);
  }

  clickOnAnswer4() {
    let clickedBtn = "answer4";
    let clickedButton = parseInt(clickedBtn.substr(clickedBtn.length - 1));
    this.getAnswer(clickedButton, clickedBtn);
  }

  render (){ 
    return (
      <React.Fragment>
        <Header />
        <main className="main">
          <Image />
          <div className="container-options">
            <div id="idAnswers" className="divGeneral divAnswers">
              <Button 
                variant="outline-info" 
                id="answer1" 
                className="btnAnswer" 
                title="Key 1"
                onClick={this.clickOnAnswer1}>
                1
              </Button>
              <Button 
                id="answer2" 
                variant="outline-info"
                className="btnAnswer" 
                title="Key 2" 
                onClick={this.clickOnAnswer2}>
                2
              </Button>
              <Button 
                id="answer3" 
                variant="outline-info"
                className="btnAnswer" 
                title="Key 3"
                onClick={this.clickOnAnswer3} >
                3
              </Button>
              <Button 
                id="answer4" 
                variant="outline-info"
                className="btnAnswer" 
                title="Key 4" 
                onClick={this.clickOnAnswer4}>
                4
              </Button>
            </div>
          </div>
          <Results />
          <div className="container-graph">
            <div style={{ width: "40%", padding: "20px 20px 40px 20px" }}>
              <CircularProgressbar
                value={this.state.percentage} 
                text={`${this.state.percentage}%`} 
                />
            </div>  
          </div>
          <ShowResult 
            correctAnswer={this.state.correctAnswerArray} 
            incorrectAnswer={this.state.incorrectAnswerArray} />
        </main>
      </React.Fragment>
    );
  }
}