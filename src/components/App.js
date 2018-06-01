import { Container } from 'reactstrap';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import List from './List';
import Modify from './Modify';

class App extends Component {
  render() {
    return (
        <Container>
        <h1 className="app__title">todos</h1>
          <Switch key="content">
            <Route path="/" exact component={List} />
            <Route path="/modify/new" exact component={Modify} />
            <Route path="/modify/edit" exact component={Modify} />
          </Switch>
        </Container>
    );
  }
}

export default App;