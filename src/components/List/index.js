import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ListItem from '../ListItem';

import { typesPriorities } from '../../helpers/const';

const { array } = PropTypes;

class List extends Component {
  static propTypes = {
    items: array,
  };

  ComponentWillMount(){

  }

  render() {
    const {
      props: {
        items,
      }
    } = this;

    return (
      <div>
        <ListGroup>
          {
            items && items.map(item => <ListItem key={item.id} item={item}/>  )
          }
        </ListGroup>
      </div>
    );
  }
}

const mapState = state => ({
  items: state.items,
});
const mapDispatch = ({
  items: { add }
                     }) => ({
  addItem: () => add(),
});

export default connect(mapState, mapDispatch)(List);
