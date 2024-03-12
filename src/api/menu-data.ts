import { useLocale } from '@/utils/locale';

const { locale } = useLocale();

export const getMenuData = () => [
  {
    type: 'meat',
    name: locale.value.products.OriginalCake,
    price: 4,
    id: 1676734364218,
  },
  {
    type: 'meat',
    name: locale.value.products.Squid,
    price: 4.5,
    id: 1676734372796,
  },
  {
    type: 'meat',
    name: locale.value.products.OrleansSteak,
    price: 4,
    id: 1676734383216,
  },
  {
    type: 'meat',
    name: locale.value.products.TengXiangChickenSteak,
    price: 3.5,
    id: 1676734401952,
  },
  {
    type: 'meat',
    name: locale.value.products.SpicedMeatSkewers,
    price: 3.5,
    id: 1676734412388,
  },
  {
    type: 'meat',
    name: locale.value.products.SichuanFlavoredTenderLoin,
    price: 2,
    id: 1676734426691,
  },
  {
    type: 'meat',
    name: locale.value.products.SichuanChickenTenders,
    price: 2,
    id: 1676734436566,
  },
  {
    type: 'meat',
    name: locale.value.products.CrabSteak,
    price: 1.5,
    id: 1676734452869,
  },
  {
    type: 'meat',
    name: locale.value.products.Bacon,
    price: 1.5,
    id: 1676734460672,
  },
  {
    type: 'meat',
    name: locale.value.products.HotDog,
    price: 1.5,
    id: 1676734469133,
  },
  {
    type: 'meat',
    name: locale.value.products.FlavoredHamSlices,
    price: 1.5,
    id: 1676734479109,
  },
  {
    type: 'meat',
    name: locale.value.products.Egg,
    price: 1.5,
    id: 1676734485032,
  },
  {
    type: 'vegetarian',
    name: locale.value.products.QianYeTofu,
    price: 2,
    id: 1676734497756,
  },
  {
    type: 'vegetarian',
    name: locale.value.products.Gluten,
    price: 2,
    id: 1676734503741,
    order: 14,
  },
  {
    type: 'vegetarian',
    name: locale.value.products.AllVegetarian,
    price: 1,
    id: 1676734514294,
  },
];
