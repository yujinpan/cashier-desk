import { describe, expect, it } from 'vitest';

import { addOrders, getOrderList } from './order';

describe('api/order', () => {
  it('should getOrderList', async function () {
    await addOrders([
      { type: '', name: '', price: 0, id: Date.now(), count: 1 },
    ]);
    await new Promise((resolve) => setTimeout(resolve));
    await addOrders([
      { type: '', name: '', price: 0, id: Date.now(), count: 1 },
    ]);

    const ordersDesc = await getOrderList();
    expect(ordersDesc[0].time > ordersDesc[1].time).toBe(true);

    const ordersAsc = await getOrderList({ order: 'asc' });
    expect(ordersAsc[0].time < ordersAsc[1].time).toBe(true);
  });
});
