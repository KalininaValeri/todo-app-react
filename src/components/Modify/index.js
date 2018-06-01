import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { typesPriorities } from '../../helpers/const';

import './index.css';

const {object} = PropTypes;

class Modify extends Component {
  static propTypes = {
    location: object,
  };

  state = {
    title: '',
    description: '',
    priority: 0,
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
      const task = items.find(item => item.id === +idTask);

      this.setState({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline,
      });
    }
  }

  render() {
    const {
      state: {
        title,
        completed,
        description,
        priority,
      },
      props: {
        location: {
          pathname,
        },
      },
    } = this;

    return (
      <Form className="form">
        <h2 className="form__title">{pathname === '/modify/new' && 'Новая задача'}</h2>
        <FormGroup className="form__group">
          <Label className="form__label">Название:</Label>
          <Input className="form__input" value={title}/>
        </FormGroup>
        <FormGroup className="form__group">
          <Label className="form__label">Описание:</Label>
          <Input className="form__input" type="textarea" name="text" value={description}/>
        </FormGroup>
        <FormGroup className="form__group">
          <Label className="form__label">Важность:</Label>
          <Input className="form__input" type="select" name="select" id="exampleSelect" value={priority}>
            {typesPriorities.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
          </Input>
        </FormGroup>
        <FormGroup className="form__group">
          <Label className="form__label">Дата выполнения:</Label>
          <Input className="form__input from__date" type="date" name="date" id="exampleDate"
                 placeholder="date placeholder"/>
          <Input className="form__input from__date" type="time" name="time" id="exampleTime"
                 placeholder="time placeholder"/>
        </FormGroup>
        <FormGroup check row>
          <Button className="form__btn" color="primary">
            {pathname === '/modify/new' ? 'Создать' : 'Редактировать'}
          </Button>
          <Button className="form__btn">Закрыть без сохранения</Button>
        </FormGroup>
      </Form>
    );
  }
}

const mapState = state => ({
  items: state.items,
});
const mapDispatch = ({
                       items: {add},
                     }) => ({
  addItem: () => add(),
});

export default connect(mapState, mapDispatch)(Modify);
