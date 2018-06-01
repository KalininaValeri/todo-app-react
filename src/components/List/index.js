import { Button } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {
  render() {
    return (
      <div>
        <Button color="danger">Danger!</Button>
      </div>
    );
  }
}

const mapState = state => ({});
const mapDispatch = ({
  items: { add }
                     }) => ({
  addItem: () => add(),
});

export default connect(mapState, mapDispatch)(List);
