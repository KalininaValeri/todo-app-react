import { setLocalStorage, getDataLocalStorage } from '../helpers/handlerForLocalStorage';
import { dispatch } from '@rematch/core';

const arrayItems = [
  {
    id: 123,
    title: 'title 1',
    completed: false,
    description: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
    priority: 0,
    deadline: '1525798800000',
  }, {
    id: 563,
    title: 'title 2',
    description: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
    priority: 2,
    deadline: '1525798800000',
    completed: '1525798800000',
  }
];

// const arrayItems = getDataLocalStorage();

export const items = {
  state: arrayItems,
  reducers: {
    addItem(state) {
      setLocalStorage();
      return state;
    },
    removeItem: (state, payload) => payload,
    setCheckedComplited: (state, payload) => payload,
  },
  effects: {
    add() {
      this.addItem();
    },
    remove(payload, rootState) {
      const {
        items,
      } = rootState;
      const newItems = items.filter(_item => _item.id !== payload );
      this.removeItem(newItems);
    },
    checkComplited(payload, rootState){
      const {
        items,
      } = rootState;

      const newItems = items.map(_item => {
        if (_item.id === payload) {
          return {
            ..._item,
            completed: _item.completed ? false : Date.now(),
          }
        }

        return _item;
      });
      this.setCheckedComplited(newItems);
      // setLocalStorage();
    },
  }
};