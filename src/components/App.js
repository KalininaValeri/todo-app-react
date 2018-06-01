import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import List from './List';
import Modify from './Modify';

class App extends Component {
  render() {
    return (
      <Switch key="content">
        <Route path="/" exact component={List} />
        <Route path="/modify" exact component={Modify} />
      </Switch>
    );
  }
}

export default App;