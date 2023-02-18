import { LocalData } from '@greatmap/common-modules';

export type MenuType = {
  id: number;
  type: string;
  name: string;
  price: number;
};

const localData = new LocalData<MenuType[]>('MENU');

export async function getMenuList(params: { type?: string } = {}) {
  let data = localData.get() || [];
  if (params.type) {
    data = data.filter((item) => item.type === params.type);
  }
  return data;
}

export async function addMenu(data: Omit<MenuType, 'id'>) {
  const oldData = await getMenuList();
  localData.set(
    oldData.concat({
      ...data,
      id: Date.now(),
    }),
  );
}

export async function updateMenu(data: MenuType) {
  const oldData = await getMenuList();
  const find = oldData.find((item) => item.id === data.id);
  if (find) {
    Object.assign(find, data);
    localData.set(oldData);
  }
}

export async function deleteMenu(id: number) {
  const oldData = await getMenuList();
  const findIndex = oldData.findIndex((item) => item.id === id);
  if (findIndex !== -1) {
    oldData.splice(findIndex, 1);
    localData.set(oldData);
  }
}
