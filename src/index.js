import React from 'react';
import ReactDOM from 'react-dom';


import App from './App';
import { HashRouter } from 'react-router-dom';

// firebase.initializeApp({
//   apiKey: "AIzaSyDrcwVdgBPCZ5MbZ92vOrkIzqnBTKoKGV4",
//   authDomain: "visuquiz-acf10.firebaseapp.com",
//   databaseURL: "https://visuquiz-acf10.firebaseio.com",
//   projectId: "visuquiz-acf10"
// });

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>, document.getElementById('root'));

