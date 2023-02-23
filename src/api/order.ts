import { getDateTimeStr, LocalData } from '@greatmap/common-modules';

import { getMenuList } from './menu';
import type { MenuType } from './menu';

export type OrderItem = MenuType & { count: number };

export function orderTotal(data: OrderItem[]) {
  return data.reduce((a, b) => (a += b.price * b.count), 0);
}

export type OrderDate = { time: number; orders: OrderItem[] };

const localData = new LocalData<OrderDate[]>('ORDERS');

export async function getOrderList(
  params: {
    startTime?: number;
    endTime?: number;
  } = {},
) {
  let result = localData.get() || [];
  if (params.startTime) {
    result = result.filter((item) => item.time > params.startTime);
  }
  if (params.endTime) {
    result = result.filter((item) => item.time < params.endTime);
  }
  return result.reverse();
}

export async function addOrders(orders: OrderItem[]) {
  const oldData = await getOrderList();
  localData.set(oldData.concat([{ time: Date.now(), orders }]));
}

export async function getOrdersTotalByDay() {
  return await getOrderList().then((res) => orderDateTotalData(res));
}

export async function getOrdersTotalByDayAndProduction() {
  const orders = await getOrderList();
  return await getMenuList().then((res) =>
    res.map((item) => ({
      name: item.name,
      data: orderDateTotalData(
        orders.map((orderDate) => ({
          time: orderDate.time,
          orders: orderDate.orders.filter((order) => order.name === item.name),
        })),
      ),
    })),
  );
}

export function orderDateTotalData(orderDate: OrderDate[]) {
  return orderDate
    .map((item) => ({
      date: getDateTimeStr(item.time, 'YYYY-MM-DD'),
      total: orderTotal(item.orders),
    }))
    .reduce((a, b) => {
      const find = a.find((item) => item.date === b.date);
      if (find) {
        find.total += b.total;
      } else {
        a.push(b);
      }
      return a;
    }, [] as { date: string; total: number }[]);
}
