import React from 'react';
import './App.css';
import Home from './views/Home';
import Aves from './views/Aves';
import Fosiles from './views/Fosiles';
import Arthropods from './views/Arthropods';
import Amphibians from './views/Amphibians';
import Reptiles from './views/Reptiles';
import Rocks from './views/Rocks';
import Mammals from './views/Mammals';
import Invertebrados from './views/Invertebrados';
import Plantas from './views/Plantas';
import { Route, Switch } from 'react-router-dom';
import { ShowResult } from './components/ShowResult';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/aves" component={Aves} />
        <Route path="/fosiles" component={Fosiles} />
        <Route path="/artropodos" component={Arthropods} />
        <Route path="/mammals" component={Mammals} />
        <Route path="/invertebrates" component={Invertebrados} />
        <Route path="/plants" component={Plantas} />
        <Route path="/amphibians" component={Amphibians} />
        <Route path="/reptiles" component={Reptiles} />
        <Route path="/rocks" component={Rocks} />
        <Route path="/results" component={ShowResult} />
      </Switch>
    </div>
  );
}
