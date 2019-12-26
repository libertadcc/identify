import React from 'react';
import './App.css';
import Home from './views/Home';
import Aves from './views/Aves';
import { Route, Switch } from 'react-router-dom';



export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/aves" component={Aves} />
      </Switch>
    </div>
  );
}
