import type { MenuType } from '../../api/menu';

export type OrderItem = MenuType & { count: number };

export function orderTotal(data: OrderItem[]) {
  return data.reduce((a, b) => (a += b.price * b.count), 0);
}
