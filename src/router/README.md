# 路由说明

## 元信息

- `meta.label` 作为菜单的名称
- `meta.icon` 作为菜单的图标
- `meta.permission` 作为菜单的权限判断

```
export default {
  path: '/home/example',
  name: 'example',
  meta: {
    // 作为菜单的名称
    label: '实例',

    // 作为菜单的图标
    icon: 's-grid'
  },

  // 使用一个空路由，用于划分模块
  component: {
    render: (h) => h('router-view')
  },
  redirect: '/home/example/sub-example1',

  // 子集
  children: [
    {
      path: '/home/example/sub-example1',
      name: 'sub-example1',
      component: SubExample,
      meta: {
        label: '实例1',
        icon: 'document',

        // 作为菜单的权限判断
        permission: 'E:1'
      }
    },
    {
      path: '/home/example/sub-example2',
      name: 'sub-example2',
      component: SubExample2,
      meta: {
        label: '实例2',
        icon: 'document',
        permission: 'E:2'
      }
    }
  ]
};
```
