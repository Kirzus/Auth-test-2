import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Login from './screen/Login'
import Register from './screen/Register'
import Protected from './screen/Protected'

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/protected" component={Protected} />
      </Switch>
    </div>
  );
}

export default App;
