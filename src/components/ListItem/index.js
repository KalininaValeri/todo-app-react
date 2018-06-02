import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';
import MaterialIcon, {colorPallet} from 'material-icons-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { typesPriorities } from '../../helpers/const';

import './index.css';

const {object} = PropTypes;

class ListItem extends Component {
  state = {
    classNameItem: '',
    complitedDate: '',
  };

  componentWillReceiveProps(props){
    const {
      item,
    } = props;

    let classNameItem = '';
    let complited;
    let complitedDate;

    if (!item.completed) {
      const newDate = new Date(`${item.deadlineDate} ${item.deadlineTime}`);
      const year = newDate.getFullYear();
      const mount = newDate.getMonth();
      const day = newDate.getDate();
      const hour = newDate.getHours();
      const minute = newDate.getMinutes();
      classNameItem = (Date.UTC(year, mount, day, hour, minute) - Date.now()) < 0 && 'task-overdue';

      this.setState({
        classNameItem,
      });
    }

    if (item.completed) {
      complited = new Date(+item.completed);
      const month = complited.getMonth() < 10 ? `0${complited.getMonth()}` : `${complited.getMonth()}`;
      const day = complited.getDate() < 10 ? `0${complited.getDate()}` : `${complited.getDate()}`;
      const hour = complited.getHours() < 10 ? `0${complited.getHours()}` : `${complited.getHours()}`;
      const minute = complited.getMinutes() < 10 ? `0${complited.getMinutes()}` : `${complited.getMinutes()}`;
      complitedDate = `${complited.getFullYear()}-${month}-${day} ${hour}:${minute}`;
      this.setState({
        complitedDate,
      });
    }
  }

  render() {
    const {
      state: {
        classNameItem,
        complitedDate,
      },
      props: {item, checkComplited, remove, pushModifyPage}
    } = this;

    const priority = typesPriorities.find(type => type.id === item.priority).name;


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
            <div className="small-block"><b>Делайн:</b> {`${item.deadlineDate} ${item.deadlineTime}`}</div>
            {item.completed && <div className="small-block"><b>Задача заверешна:</b> {complitedDate}</div>}
          </div>
        </div>
        <div className="item__component btn-group">
          {!item.completed && <div className="button-icon edit" onClick={() => {pushModifyPage(`edit/${item.id}`)}}>
            <MaterialIcon icon="edit" color='#fff' size={16}/>
          </div>}
          <div className="button-icon delete" onClick={() => {remove(item.id)}}>
            <MaterialIcon icon="delete" color='#fff' size={16}/>
          </div>
        </div>
      </ListGroupItem>
    );
  }
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
