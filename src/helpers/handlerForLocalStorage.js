import { store } from '../shared/store/create-store';

export const setLocalStorage = () => {
  const {
    items,
  } = store.getState();
  localStorage.clear();
  localStorage.setItem('data', JSON.stringify(items));
};

export const getDataLocalStorage = () => {
  const data = localStorage.getItem('data');
  return data ? JSON.parse(data) : [];
};