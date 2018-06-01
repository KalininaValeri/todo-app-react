import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
} from 'reactstrap';
import MaterialIcon, {colorPallet} from 'material-icons-react';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { typesPriorities } from '../../helpers/const';

import './index.css';

const {object} = PropTypes;

const ListItem = ({item, checkComplited, remove}) => {
  const priority = typesPriorities.find(type => type.id === item.priority).name;
  let classNameItem = '';
  let complited;
  let complitedDate;

  if (!item.completed) {
    classNameItem = (item.deadline - Date.now()) < 0 && 'task-overdue';
  }

  if (item.completed) {
    complited = new Date(+item.completed);
    complitedDate = `${complited.getDay()}-${complited.getMonth()}-${complited.getFullYear()} ${complited.getHours()}:${complited.getMinutes()}`;
  }

  const deadline = new Date(+item.deadline);
  const deadlineDate = `${deadline.getDay()}-${deadline.getMonth()}-${deadline.getFullYear()} ${deadline.getHours()}:${deadline.getMinutes()}`;

  return (
    <ListGroupItem className={`item ${classNameItem}`}>
          <div className="item__component button-icon checkbox" onClick={() => {checkComplited(item.id)}}>
            { item.completed && <MaterialIcon icon="done" color='green' size={25}/>}
          </div>
      <div className="item__content item__component">
        <ListGroupItemHeading>{item.title}</ListGroupItemHeading>
        <ListGroupItemText>{item.description}</ListGroupItemText>
        <div className="item-footer">
          <div className="small-block">{priority}</div>
          <div className="small-block"><b>Делайн:</b> {deadlineDate}</div>
          {item.completed && <div className="small-block"><b>Задача заверешна:</b> {complitedDate}</div>}
        </div>
      </div>
      <div className="item__component button-icon delete" onClick={() => {remove(item.id)}}>
        <MaterialIcon icon="delete" color='#fff' size={16}/>
      </div>
    </ListGroupItem>
  );
};

ListItem.propTypes = {
  item: object,
};

const mapState = state => ({
  items: state.items,
});
const mapDispatch = ({
                       items: {checkComplited, remove},

                     }) => ({
  checkComplited: (id) => checkComplited(id),
  remove: (id) => remove(id),
});

export default connect(mapState, mapDispatch)(ListItem);
