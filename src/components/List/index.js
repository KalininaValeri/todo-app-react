import { ListGroup } from 'reactstrap';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ListItem from '../ListItem';
import Filter from '../Filter';

import { typesPriorities } from '../../helpers/const';

const { array } = PropTypes;

class List extends Component {
  static propTypes = {
    items: array,
  };

  componentWillMount(){
    const {
      props: {

      }
    } = this;
  }

  render() {
    const {
      props: {
        items,
        filterState,
      }
    } = this;

    let listItems = [];

    if (items) {
      listItems = filterState !==null ? items.filter(item => item.priority === filterState) : items;
    }

    return (
      <Fragment>
        {listItems.length ? <Filter/> : ''}
        <ListGroup>
          {listItems.map(item => <ListItem key={item.id} item={item}/>)}
        </ListGroup>
      </Fragment>
    );
  }
}

const mapState = state => ({
  items: state.items,
  filterState: state.filterState,
});
const mapDispatch = ({
  items: { add }
                     }) => ({
  addItem: () => add(),
});

export default connect(mapState, mapDispatch)(List);
