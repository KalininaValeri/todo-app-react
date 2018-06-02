import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
} from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import { typesPriorities } from '../../helpers/const';

import './index.css';

const {object} = PropTypes;

class Modify extends Component {
  static propTypes = {
    location: object,
  };

  state = {
    id: null,
    title: '',
    description: '',
    priority: 0,
    deadlineDate: '',
    deadlineTime: '',
    formError: false,
  };

  componentWillMount() {
    const {
      props: {
        items,
        location: {
          pathname,
        },
      },
    } = this;



    if (pathname !== '/modify/new') {
      const idTask = pathname.substr(13);
      const task = items.find(item => {
        console.log('---', item.id, idTask);
        return item.id === idTask
      });
      console.log(idTask);
      const deadline = new Date(+task.deadline);
      const day = deadline.getDate() < 10 ? `0${deadline.getDate()}` : `${deadline.getDate()}`;
      const month = deadline.getMonth() < 10 ? `0${deadline.getMonth()}` : `${deadline.getMonth()}`;
      const hour = deadline.getHours() < 10 ? `0${deadline.getHours()}` : `${deadline.getHours()}`;
      const minutes = deadline.getMinutes() < 10 ? `0${deadline.getMinutes()}` : `${deadline.getMinutes()}`;
      const date = `${deadline.getFullYear()}-${month}-${day}`;
      const time = `${hour}:${minutes}`;

      this.setState({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        deadlineDate: date,
        deadlineTime: time,
      });
    }
  }

  onChangeName = event => {
    this.setState({
      title: event.target.value,
      formError: false,
    });
  };

  onChangeDescription = event => {
    this.setState({
      description: event.target.value,
      formError: false,
    });
  };

  onChangePriority = event => {
    this.setState({
      priority: event.target.value,
      formError: false,
    });
  };

  onChangeDeadlineDate = event => {
    this.setState({
      deadlineDate: event.target.value,
      formError: false,
    });
  };

  onChangeDeadlineTime = event => {
    this.setState({
      deadlineTime: event.target.value,
      formError: false,
    });
  };

  onClickSubmit = event => {
    event.preventDefault();
    const {
      props: {
        addItem,
        editItem,
        history,
        location: {
          pathname,
        },
      },
      state: {
        id,
        title,
        description,
        priority,
        deadlineDate,
        deadlineTime,
      }
    } = this;

    if (!title || !description || !deadlineDate || !deadlineTime) {
      this.setState({
        formError: true,
      });
      return false;
    }

    const idEdit = id ? id : v4();

    const newDate = new Date(`${deadlineDate} ${deadlineTime}`);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const day = newDate.getDate();
    const hour = newDate.getHours() - 7;
    const minutes = newDate.getMinutes();
    const deadline = Date.UTC(year, month, day, hour, minutes);

    const newItem = {
      id: idEdit,
      title,
      completed: false,
      description,
      priority: +priority,
      deadline
    };

    if (pathname === '/modify/new') {
      addItem(newItem);
      history.push('/');
      return false;
    }

    editItem(newItem);
    history.push('/');
  };

  render() {
    const {
      onChangeName,
      onChangeDeadlineDate,
      onChangeDeadlineTime,
      onChangeDescription,
      onChangePriority,
      onClickSubmit,
      state: {
        title,
        description,
        priority,
        deadlineDate,
        deadlineTime,
        formError,
      },
      props: {
        history,
        location: {
          pathname,
        },
      },
    } = this;

    return (
      <Form className="form" onSubmit={onClickSubmit}>
        <h2 className="form__title">{pathname === '/modify/new' && 'Новая задача'}</h2>
        <FormGroup className="form__group">
          <Label className="form__label">Название:</Label>
          <Input
            className="form__input"
            value={title}
            onChange={onChangeName}
          />
        </FormGroup>
        <FormGroup className="form__group">
          <Label className="form__label">Описание:</Label>
          <Input
            className="form__input"
            type="textarea"
            name="text"
            value={description}
            onChange={onChangeDescription}
          />
        </FormGroup>
        <FormGroup className="form__group">
          <Label className="form__label">Важность:</Label>
          <Input
            className="form__input"
            type="select"
            name="select"
            id="exampleSelect"
            value={priority}
            onChange={onChangePriority}
          >
            {typesPriorities.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
          </Input>
        </FormGroup>
        <FormGroup className="form__group">
          <Label className="form__label">Дата выполнения:</Label>
          <Input
            className="form__input from__date"
            type="date"
            name="date"
            id="exampleDate"
            placeholder="date placeholder"
            onChange={onChangeDeadlineDate}
            value={deadlineDate}
          />
          <Input
            className="form__input from__date"
            type="time"
            name="time"
            id="exampleTime"
            placeholder="time placeholder"
            onChange={onChangeDeadlineTime}
            value={deadlineTime}
          />
        </FormGroup>
        <FormGroup>
          <Button className="form__btn" color="primary" type='submit'>
            {pathname === '/modify/new' ? 'Создать' : 'Редактировать'}
          </Button>
          <Button className="form__btn" onClick={() => {history.push('/');}}>Закрыть без сохранения</Button>
        </FormGroup>
        { formError && <div className="form__error">Заполните все поля формы</div> }
      </Form>
    );
  }
}

const mapState = state => ({
  items: state.items,
});
const mapDispatch = ({
                       items: {add, edit},
                     }) => ({
  addItem: (object) => add(object),
  editItem: (object) => edit(object),
});

export default connect(mapState, mapDispatch)(Modify);
