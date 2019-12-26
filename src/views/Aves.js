import React, { Fragment } from 'react';
import Header from '../components/Header';
import './Aves.scss';
function Aves () {

  return(
    <Fragment>
      <Header />
      <h1>Aves</h1>
      <main className="main">
        <img 
          id="imgQuestion"
          className="imgQuestion"></img>
        <div id="idAnswers" className="divGeneral divAnswers">
          <button 
            id="answer1" 
            className="btnAnswer" 
            title="Key 1" 
            // onClick="clickOnAnswer(this.id)"
            >1
          </button>
          <button 
            id="answer2" 
            className="btnAnswer" 
            title="Key 2" 
            // onClick="clickOnAnswer(this.id)"
            >2
          </button>
          <button 
            id="answer3" 
            className="btnAnswer" 
            title="Key 3" 
            // onClick="clickOnAnswer(this.id)"
            >3
          </button>
          <button 
            id="answer4" 
            className="btnAnswer" 
            title="Key 4" 
            // onClick="clickOnAnswer(this.id)"
            >4
          </button>
        </div>
        <div id="idDivResults" className="divGeneral divResults">
          <div id="idTitleResults">
            <span 
              className="idResultsPercentage" 
              id="idResultsPercentage">
                Results %
            </span>
          </div>
          <div id="divResultsSpan"></div>
        </div>
      </main>
    </Fragment>
  );
}

export default Aves;