import { init } from '@rematch/core';
import { items } from '../../services/items';

export const store = init({
  models: {
    items,
  }
});

