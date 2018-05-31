import { setLocalStorage } from '../helpers/setLocalStorage';

const arrayItems = [
  {
    id: 123,
    title: 'title 1',
    completed: false,
    description: 'qwe, qwe, qwe, qwe',
    priority: 0,
    deadline: 'May 31 2018',
    close_date: 'May 31 2018',
  }, {
    id: 563,
    title: 'title 2',
    completed: false,
    description: 'qwe, qwe, qwe, qwe',
    priority: 0,
    deadline: 'May 31 2018',
    close_date: 'May 31 2018',
  }
];

export const items = {
  state: arrayItems,
  reducers: {
    addItem(state) {
      setLocalStorage();
      return state;
    },
  },
  effects: {
    add(){
      this.addItem();
    },
  }
};