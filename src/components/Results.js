import React from 'react';

export function Results () {
  return (
    <div id="idDivResults" className="divGeneral divResults">
      <div id="idTitleResults">
        <span 
          className="idResultsPercentage" 
          id="idResultsPercentage">
          <span role="img" alt="stats">📊 </span>Resultados %
        </span>
      </div>
      {/* <div id="divResultsSpan"></div> */}
    </div>
  );
}