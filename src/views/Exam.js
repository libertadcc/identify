import React from 'react';
import Header from '../components/Header';
import { Image } from '../components/Image';
import './exam.scss';


import { Button, InputGroup, FormControl, Col, Row } from 'react-bootstrap';


let gData = [];
let gStackQuestions;
let gCurrentIndex = 0;
let userAnswer = '';
let selectedQuestion = '';

let listCandidates = [];
let correctAnswer;


const data = [
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_UiU_zxWaU7N9FHTT1Sly6O-QzzjwLS-MVrU4f1yiNcRAhsE2zA&s",
    "a": "Ara macao" },
  { "q": "https://www.mascotarios.org/wp-content/uploads/2011/10/Cotorra-argentina-1.jpg" ,
		"a" : "Mylopsitta monachus"},
	{ "q": "https://upload.wikimedia.org/wikipedia/commons/2/28/Psittacus_erithacus_-perching_on_tray-8d.jpg",
    "a": "Psittacus erithacus" },
  { "q": "https://www.mascotarios.org/wp-content/uploads/2014/12/Cacatua-Ninfa.jpg",
    "a": "Nymphicus hollandicus" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrPf6Ewslj7pIjCKKz4qfuQfl8PbU1rGAvA37WgYV6sqClW4D&s",
    "a": "Melopsittacus undulatus" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDmutUk89Jm52vjf4QblEOnjjIfkS-o83Ffs-AYLAFL3gcEYTV&s",
    "a": "Aratinga solstitialis"},
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxhPk7wd0ktqurmj8dfaqP421SU1qKf-dLEZ1WewiU0EDyynf&s",
    "a": "Cacatua alba" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGrBTbxbYbTFdz8UcSLLiTlDTz9-vDzpNi4h-4dcj-H5cWnM-K&s",
    "a": "Cacatua galerita" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7pIiO9L-wZ4KYn5l7Ce2fs7gPX9a-gJ_BFMVOmCsJSJHPMJwL&s",
    "a": "Cacatua sulfurea" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSDuGHtKlHzqak7BYXQD2APhiIm2aJy4MPonZH4fgpbMeK3Gq7_g&s", 
    "a": "Anser anser" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThMbObp_B9rn3-NxHR_PU98Rm7oG4MP8CDxDYysxY9LTnQwxR8Bw&s",
    "a": "Anser fabalis" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRNi-NpH4l5mkDxEiEBA1YLIrDFBIg1tzj-tbwmZXAx3_WP0JB6A&s", 
    "a": "Anser albifrons" },
  { "q": "https://previews.123rf.com/images/montypeter/montypeter1707/montypeter170700041/82415997-beautifully-young-swan-cygnus-olor-.jpg" ,
    "a": "Cygnus olor" }, 
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLF5Y3qgVaS8zfE_15FrokQxXzF_Eqm2Ad7e59qaa6W_jouflU&s",
    "a": "Branta leucopsis" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA-zDLdHwzc5zgivWsiJEpvbeTG1FA4FzUIkXa7AdTRi5c4XPC&s",
    "a": "Branta bernicla" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShlrXB-NPaxCQDOo_n5W9GcdZV9_oiIqIICmdqeKmMx94oXlx6&s",
    "a": "Tadorna tadorna" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgl0pSfOxKlv90f_nqpO0ydgfuEFaBjU3LeZ-M72GC1cdYlEkQ&s",
    "a": "Anas platyrhynchos" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyhPiI8UjdorNVTUAU_kSKUYzRmDNRWspOOblTR_c3sISvzsqnLA&s",
    "a": "Mareca penelope" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZqTiD0WUNDk2wP1mtOIpvEYup4KyMlECn97y1e8bEw82sEGhKyw&s",
    "a": "Anas acuta" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaXS5FrvdvQGjj1L2H3angHU4uIPB3Uian5OOEwBSs54HSFdcv&s",
    "a": "Anas strepera" },
  { "q": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGOEDWrO8sDlvMNWg7uY3NJc1jjUIWQahI8S7DuO8sUrx50HprVA&s",
    "a": "Anas clypeata" },
];

export default class Exam extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: data,
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

    // Guardar respuestas correctas o incorrectas en el array
    if(userAnswer === selectedQuestion.a) {
      this.state.correctAnswers.push(selectedQuestion.a);
    } else if(userAnswer !== selectedQuestion.a) {
      this.state.incorrectAnswers.push(selectedQuestion.a);
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
          <Button variant="outline-info" className="btn" onClick={this.nextQuestion}>Siguiente pregunta</Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}
}