export const filterState = {
  state: null,
  reducers: {
    setFilter: (state, payload) => payload,
  },
  effects: {
    filter(payload) {
        this.setFilter(payload);
    }
  }
};