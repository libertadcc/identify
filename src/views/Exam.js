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

let gData = [];
let gStackQuestions;
let gCurrentIndex = 0;
let userAnswer = '';
let selectedQuestion = '';

let listCandidates = [];
let correctAnswer;

let data = [];

export default class Exam extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: data.concat(arthropods).concat(amphibians).concat(birds).concat(fishes).concat(fossils).concat(invert).concat(mammals).concat(plants).concat(reptiles).concat(rocks),
      count: 1,
      isCorrect: 2,
      hideAnswer: true,
      correctAnswers: [],
      incorrectAnswers: [],
    }
    this.init = this.init.bind(this);
    this.userAnswer = this.userAnswer.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getNextCandidate = this.getNextCandidate.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }


  init() {
    gData = this.state.data;
    gStackQuestions = this.shuffle(gData);
    this.createQuestion();    
  }
  
  componentDidMount() {
    this.init();
    const answerDiv = document.querySelector('.answer-specie').classList;
    if(this.state.hideAnswer === false) {
      answerDiv.remove('hidden')
      answerDiv.add('shown')
    } else if (this.state.hideAnswer === true) {
      answerDiv.add('hidden')
      answerDiv.remove('shown')
    }
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

  getNextCandidate() {
    listCandidates = this.state.data;
    correctAnswer = selectedQuestion.a;
    let found = false;
    let nextCandidate = "";
    // Hay que ver cómo parar de que salgan números mayores de la longitud del array
    while (!found) {
      let randomIndex = Math.floor(Math.random() * gData.length);
      nextCandidate = gData[randomIndex].a;
      if (nextCandidate !== correctAnswer && listCandidates.indexOf(nextCandidate) === -1) {
        found = true;
        listCandidates.push(nextCandidate);
      }
    }
    return nextCandidate
  }

  createQuestion() {
    selectedQuestion = gStackQuestions[gCurrentIndex];
    document.querySelector(".imgQuestion").setAttribute('src', selectedQuestion.q);
    document.getElementById("answer").innerHTML = selectedQuestion.a;
  }

  userAnswer(event) {
    userAnswer = event.currentTarget.value;
  }

  checkAnswer() {
    // Si es correcto es 0,
    // incorrecto código 1
    // Sin contestar aún 2

  // Respuesta incorrecta
    if (userAnswer !== selectedQuestion.a) {
      document.getElementById("conclusion").innerHTML = 'Incorrecto';
      document.getElementById('conclusion').classList.add('incorrect');
      this.setState({isCorrect: 1});
  // Respuesta correcta   
    } else if (userAnswer === selectedQuestion.a) {
      document.getElementById("conclusion").innerHTML = '¡Correcto!';
      document.getElementById('conclusion').classList.add('correct');
      this.setState({isCorrect: 0});
    }
  }

  showAnswer() {
    const answerDiv = document.querySelector('.answer-specie').classList;
    if(this.state.hideAnswer === false) {
      this.setState({hideAnswer: true})
      answerDiv.add('hidden')
      answerDiv.remove('shown')
    } else if (this.state.hideAnswer === true) {
      this.setState({hideAnswer: false})
      answerDiv.remove('hidden')
      answerDiv.add('shown')
    }
  }

  nextQuestion() {
    this.setState(
      {count: this.state.count + 1,
      hideAnswer: true,
      isCorrect: 2}
    );
    this.checkAnswer();
    let lastIndex = this.state.count;

    const answerDiv = document.querySelector('.answer-specie').classList;
    // Guardar respuestas correctas o incorrectas en el array
    if(userAnswer === selectedQuestion.a) {
      this.state.correctAnswers.push(selectedQuestion.a);
    } else if(userAnswer !== selectedQuestion.a) {
      this.state.incorrectAnswers.push(selectedQuestion.a);
      answerDiv.remove('hidden')
      answerDiv.add('shown')
    }

    setTimeout(function() {
      // Reseta el input
      document.getElementById("input-answer").value = "";

      // Resetea el correcto o incorrecto
      document.getElementById("conclusion").innerHTML = '';

      // Oculta la respuesta anterior
      const answerDiv = document.querySelector('.answer-specie').classList;
      answerDiv.add('hidden')
      answerDiv.remove('shown')
      
      // Carga nueva pregunta
      selectedQuestion = gStackQuestions[lastIndex];
      document.querySelector(".imgQuestion").setAttribute('src', selectedQuestion.q);
      document.getElementById("answer").innerHTML = selectedQuestion.a;
    }, 1000);
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.nextQuestion();
    }
  }

  render (){ 
  return (
    <React.Fragment>
      <Header />
      <img 
      alt="Foto de especie"
      id="imgQuestion"
      className="imgQuestion"/>

      <Row>
        <Col sm="3"></Col>
        <Col sm="6">
          <InputGroup col="2" className="sm-2">
            <FormControl
              type="text"
              placeholder="Nombre de la especie"
              id="input-answer"
              onChange={this.userAnswer}
              onKeyDown={this._handleKeyDown}
            />
          </InputGroup>
        </Col>
        <Col sm="3"></Col>
      </Row>

      {/* <Col sm="2">
        <input type="text" id="input-answer" onChange={this.userAnswer}/>
      </Col> */}

      <p id="answer" className="answer-specie hidden answer-text"></p>
      <p id="conclusion" className="answer-text"></p>

      {/* <button className="btnAnswer" onClick={this.checkAnswer}>Check answer</button>
      <button className="btnAnswer" onClick={this.showAnswer}>Show answer</button>
      <button className="btnAnswer" onClick={this.nextQuestion}>next Question</button> */}

      <Row className="row-btns">
        <Col sm="4">
          <Button variant="outline-info" className="btn" onClick={this.checkAnswer}>Comprobar solución</Button>
        </Col>
        <Col sm="4">
          <Button variant="outline-info" className="btn" onClick={this.showAnswer}>Mostrar solución</Button>
        </Col>
        <Col sm="4">
          <Button variant="outline-info" className="btn" 
          onClick={this.nextQuestion} >Siguiente pregunta</Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}
}