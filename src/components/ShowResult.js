import React from 'react'; 
import './results.scss';


export function ShowResult ({correctAnswer, incorrectAnswer}) {

  const mapCorrect = () => {
    console.log('showCorrect', correctAnswer)
    if (correctAnswer != undefined) {
      return (
        <ul className="list-result" >{correctAnswer.map((item, id) => {
          return (
            <li className="list-item" key={id}>{item}</li>
          );
        })}</ul>
      );
    } 
  }

  const mapIncorrect = () => {
    if (incorrectAnswer != undefined) {
      return (
        <ul className="list-result">{incorrectAnswer.map((item, id) => {
          return (
            <li className="list-item" key={id}>{item}</li>
          );
        })}</ul>
      );
    } 
  }

  return (
    <div className="results">
      <div className="block-results">
        <h3>Correctas ✅</h3>
          {mapCorrect()}
      </div> 
        
      <div className="block-results">
        <h3>Incorrectas ❌</h3>
          {mapIncorrect()}
      </div> 
    </div>
  );
}