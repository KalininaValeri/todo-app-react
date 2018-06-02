import { setLocalStorage, getDataLocalStorage } from '../helpers/handlerForLocalStorage';
import { dispatch } from '@rematch/core';

const arrayItems = getDataLocalStorage();

export const items = {
  state: arrayItems,
  reducers: {
    addItem: (state, payload) => [...state, payload],
    editItem: (state, payload) => payload,
    removeItem: (state, payload) => payload,
    setCheckedComplited: (state, payload) => payload,
  },
  effects: {
    add(payload) {
      this.addItem(payload);
      setLocalStorage();
    },
    edit(payload, rootState){
      const {
        items,
      } = rootState;
      const editItems = items.map(item => item.id === payload.id ? payload : item);
      this.editItem(editItems);
      setLocalStorage();
    },
    remove(payload, rootState) {
      const {
        items,
      } = rootState;
      const newItems = items.filter(_item => _item.id !== payload );
      this.removeItem(newItems);
      setLocalStorage();
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
      setLocalStorage();
    },
  }
};