import React from 'react';
import logo from './logo.svg';
import './App.css';
import India from './components/India';
import State from './components/State';
import World from './components/World';
import Header from './components/Header';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';

function App() {
  return (
   <div className='container-fluid'>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
            <India/>
        </Route>
        <Route path="/world">
          <World/>
        </Route>
      </Switch>
    </Router>
   </div>
  );
}

export default App;
