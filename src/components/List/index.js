import { ListGroup, Button } from 'reactstrap';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ListItem from '../ListItem';
import Filter from '../Filter';

import './index.css';

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

  pushModifyPage = (path) => {
    const {
      props: {
        history,
      }
    } = this;
    history.push(`/modify/${path}`);
  };

  render() {
    const {
      pushModifyPage,
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
        <header className="header">
          <Button onClick={() => pushModifyPage('new')} className="new" outline color="success">Создать новую задачу</Button>
          {items.length ? <Filter/> : ''}
        </header>
        <ListGroup>
          {listItems.map(item => <ListItem key={item.id} item={item} pushModifyPage={pushModifyPage}/>)}
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
