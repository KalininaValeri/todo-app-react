import { init } from '@rematch/core';
import { items } from '../../services/items';
import { filterState } from '../../services/filterState';

export const store = init({
  models: {
    items,
    filterState,
  }
});

