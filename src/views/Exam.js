import React from 'react';
import Header from '../components/Header';
import './exam.scss';
import { Button, InputGroup, FormControl, Col, Row } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';

import { ShowResult } from '../components/ShowResult';
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

import moment from 'moment';
import { withFirebaseHOC } from '../components/Firebase'

let gData = [];
let gStackQuestions;
let gCurrentIndex = 0;
let userAnswer = '';
let selectedQuestion = '';

let listCandidates = [];
let correctAnswer;



class Exam extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      count: 1,
      isCorrect: 2,
      hideAnswer: true,
      correctAnswers: [],
      incorrectAnswers: [],
      finishedTest: false,
      percentage: 0,
      results: [],
    }
    this.checkUserLogged = this.checkUserLogged.bind(this);
    this.init = this.init.bind(this);
    this.getSelectedTopics = this.getSelectedTopics.bind(this);
    this.userAnswer = this.userAnswer.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getNextCandidate = this.getNextCandidate.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this.showResultExam = this.showResultExam.bind(this);
    this.getPercentage = this.getPercentage.bind(this);
    this.makeid = this.makeid.bind(this);
  }

  getSelectedTopics () {
    const selected = this.props.location.state.selected;
    selected.map((topic) => {
      if(topic === 'birds' ) this.setState(prevState =>({data: prevState.data.concat(birds)}));
      if (topic === 'mammals') this.setState(prevState => ({data: prevState.data.concat(mammals)}));
      if (topic === 'plants') this.setState(prevState => ({data: prevState.data.concat(plants)}));
      if (topic === 'rocks') this.setState(prevState => ({data: prevState.data.concat(rocks)}));
      if (topic === 'reptils') this.setState(prevState => ({data: prevState.data.concat(reptiles)}));
      if (topic === 'fishes') this.setState(prevState => ({data: prevState.data.concat(fishes)}));
      if (topic === 'amphibians') this.setState(prevState => ({data: prevState.data.concat(amphibians)}));
      if (topic === 'arthropods') this.setState(prevState => ({data: prevState.data.concat(arthropods)}));
      if (topic === 'invert') this.setState(prevState => ({data: prevState.data.concat(invert)}));
      if (topic === 'fossils') this.setState(prevState => ({data: prevState.data.concat(fossils)}));
    });
  }

  init() {
    gData = this.state.data;
    gStackQuestions = this.shuffle(gData);
    setTimeout(() => {
      this.createQuestion();    
    }, 0);
  }
  
  checkUserLogged() {
    if (sessionStorage.getItem('userToken') === null){
      return this.props.history.push('/login')
    }
  }

  componentDidMount() {
    this.checkUserLogged();
    this.getSelectedTopics();
    setTimeout(() => {
      this.init();
      const answerDiv = document.querySelector('.answer-specie').classList;
      if(this.state.hideAnswer === false) {
        answerDiv.remove('hidden')
        answerDiv.add('shown')
      } else if (this.state.hideAnswer === true) {
        answerDiv.add('hidden')
        answerDiv.remove('shown')
      }
    }, 0);
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

    /* ¡¡¡¡¡¡¡¡¡¡ Comprobar con un find o un filter que no está en el array y si está quitarlo, es decir, 
    QUITAR DUPLICIDADES DE LOS ARRAYS DE RESPUESTA! */
    if(userAnswer === selectedQuestion.a) {
      this.state.correctAnswers.push(selectedQuestion.a);
    } else if(userAnswer !== selectedQuestion.a) {
      this.state.incorrectAnswers.push(selectedQuestion.a);
      answerDiv.remove('hidden')
      answerDiv.add('shown')
    }
    this.getPercentage();
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

  // Generate an id to save in databaase
  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
  async showResultExam (){
    this.setState({finishedTest: true});
    setTimeout(() => {
      var elmnt = document.getElementById("results");
      elmnt.scrollIntoView();
    }, 20);

    // const id = this.makeid(20)
    // console.log('id', id);
    let dateTime = new Date();
    dateTime = moment(dateTime).format("DD/MM/YYYY HH:mm:ss");

    console.log('dateTime', dateTime)
    let results = {
      id: this.makeid(20),
      studentId: sessionStorage.getItem('userToken'),
      corrects: this.state.correctAnswers,
      incorrects: this.state.incorrectAnswers,
      date: dateTime,
    };

    await this.props.firebase.sendData(results);
  }

  getPercentage() {
    let gPercentage = (this.state.correctAnswers.length / this.state.count) * 100.0;
    gPercentage = Math.round(gPercentage * 100) / 100;
    this.setState({percentage: gPercentage});
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

      <p id="answer" className="answer-specie hidden answer-text"></p>
      <p id="conclusion" className="answer-text"></p>
      
      <Row className="row-btns">
        <Col sm="4">
          <Button variant="outline-info" className="btn" onClick={this.checkAnswer} disabled={this.state.finishedTest}>Comprobar solución</Button>
        </Col>
        <Col sm="4">
          <Button variant="outline-info" className="btn" onClick={this.showAnswer} disabled={this.state.finishedTest}>Mostrar solución</Button>
        </Col>
        <Col sm="4">
          <Button variant="outline-info" className="btn" 
          onClick={this.nextQuestion} disabled={this.state.finishedTest}>Siguiente pregunta</Button>
        </Col>
      </Row>
      <Row>
        <Col sm="2"></Col>
        <Col sm="8">
          <Button 
          onClick={this.showResultExam}>
            Finalizar test</Button>
        </Col>
        <Col sm="2"></Col>
      </Row>
      {this.state.finishedTest &&
        <React.Fragment>
          <Row>
          <Col sm="2"></Col>
            <Col sm="8">
              <br />
              <h3 id="results">Resultados del examen</h3>
              <div className="container-graph">
                <div style={{ width: "40%", padding: "20px 20px 40px 20px" }}>
                  <CircularProgressbar
                    value={this.state.percentage} 
                    text={`${this.state.percentage}%`} 
                    />
                </div>  
              </div>
              <ShowResult 
                correctAnswer={this.state.correctAnswers} 
                incorrectAnswer={this.state.incorrectAnswers} />
            </Col>
          <Col sm="2"></Col>
          </Row>
          <Link to="/">
            <Button>Volver a inicio</Button>
          </Link>
        </React.Fragment>
      }
    </React.Fragment>
  );
}
}

export default withFirebaseHOC(Exam)