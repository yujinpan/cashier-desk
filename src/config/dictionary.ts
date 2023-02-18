import { Dictionary } from '@greatmap/common-modules';

export const DICT = new Dictionary({
  getByTypeMethod: () => Promise.resolve([]),
});

DICT.add('menu_type', [
  { value: 'meat', label: '荤菜' },
  { value: 'vegetarian', label: '素菜' },
]);
