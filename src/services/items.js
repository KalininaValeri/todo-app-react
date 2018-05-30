const arrayItems = [
  {
    id: 123,
    completed: false,
    description: 'qwe, qwe, qwe, qwe',
    priority: 0,


  },
];

export const items = {
  state: [],
  reducers: {
    addItem: (state) => state,
  },
  effects: {
    add: () => this.addItem(),
  }
};