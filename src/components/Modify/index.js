import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const { object } = PropTypes;

class List extends Component {
  static propTypes = {
    location: object,
  };

  render() {
    return (
      <div>
        qwe
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
