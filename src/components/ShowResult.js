import React from 'react'; 
import './results.scss';


export function ShowResult ({correctAnswer, incorrectAnswer}) {

  const mapCorrect = () => {
    if (correctAnswer !== undefined) {
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
    if (incorrectAnswer !== undefined) {
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
        <i className="fas fa-check corrects"></i>

          {/* <span role="img" alt="correct">✅</span> */}
          {mapCorrect()}
      </div> 
        
      <div className="block-results">
        {/* <h3>Incorrectas <span role="img" alt="incorrect">❌</span></h3> */}
        <i className="fas fa-times incorrects"></i>
          {mapIncorrect()}
      </div> 
    </div>
  );
}