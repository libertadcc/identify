import React from 'react';
import './App.scss';
import Home from './views/Home';
import Aves from './views/Aves';
import Fosiles from './views/Fosiles';
import Arthropods from './views/Arthropods';
import Amphibians from './views/Amphibians';
import Reptiles from './views/Reptiles';
import Rocks from './views/Rocks';
import Mammals from './views/Mammals';
import Plantas from './views/Plantas';
import Invertebrados from './views/Invertebrados';
import Peces from './views/Peces';
import Exam from './views/Exam';
import GameModes from './views/GameModes';
import Custom from './views/Custom';
import Login from './views/LogIn';
import Signup from './views/SignUp';

import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={GameModes} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
        <Route path="/aves" component={Aves} />
        <Route path="/fosiles" component={Fosiles} />
        <Route path="/artropodos" component={Arthropods} />
        <Route path="/mammals" component={Mammals} />
        <Route path="/invertebrates" component={Invertebrados} />
        <Route path="/plants" component={Plantas} />
        <Route path="/amphibians" component={Amphibians} />
        <Route path="/reptiles" component={Reptiles} />
        <Route path="/rocks" component={Rocks} />
        <Route path="/fishes" component={Peces} />
        <Route path="/exam" component={Exam} />
        <Route path="/game-mode" component={GameModes} />
        <Route path="/custom" component={Custom} />
      </Switch>
    </div>
  );
}
