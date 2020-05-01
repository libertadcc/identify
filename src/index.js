import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { HashRouter } from 'react-router-dom';

import Firebase, { FirebaseProvider } from './components/Firebase'

ReactDOM.render(
  <FirebaseProvider value={Firebase}>
    <HashRouter>
        <App />
    </HashRouter>
  </FirebaseProvider>,
  document.getElementById('root')
);
