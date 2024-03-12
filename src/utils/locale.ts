import { computed, ref } from 'vue';

type LangType = keyof LocaleData;

type LocaleItem = {
  language: { language: string; zh: string; en: string };
  currency: { symbol: string; name: string };
  navbar: { dashboard: string; menu: string; order: string; stat: string };
  order: {
    name: string;
    count: string;
    emptyMsg: string;
    submit: string;
    confirmTitle: string;
    completeButtonText: string;
    cancelButtonText: string;
    unitPrice: string;
    totalPrice: string;
    time: string;
    details: string;
    dateAll: string;
    date1d: string;
    date1w: string;
    date1m: string;
    date3m: string;
    date6m: string;
    date12m: string;
    export: string;
    per: string;
  };
  handle: {
    successMsg: string;
    handle: string;
    edit: string;
    delete: string;
    confirmDeleteMsg: string;
  };
  menu: {
    create: string;
    number: string;
    type: string;
    name: string;
    all: string;
    meat: string;
    vegetarian: string;
  };
  validate: { required: string; number: string };
  stat: { totalDailyRevenue: string; productDailyRevenue: string };
  products: {
    OriginalCake: string;
    Squid: string;
    OrleansSteak: string;
    TengXiangChickenSteak: string;
    SpicedMeatSkewers: string;
    SichuanFlavoredTenderLoin: string;
    SichuanChickenTenders: string;
    CrabSteak: string;
    Bacon: string;
    HotDog: string;
    FlavoredHamSlices: string;
    Egg: string;
    QianYeTofu: string;
    Gluten: string;
    AllVegetarian: string;
  };
  settings: { settings: string };
};

type LocaleData = {
  zh: LocaleItem;
  en: LocaleItem;
};

const CONFIG: LocaleData = {
  zh: {
    language: { language: '语言', zh: '中文', en: '英文' },
    currency: { name: '元', symbol: '¥' },
    navbar: { dashboard: '收银台', menu: '菜单', order: '订单', stat: '统计' },
    order: {
      name: '名称',
      count: '数量',
      emptyMsg: '订单为空',
      submit: '下单',
      confirmTitle: '订单确认',
      completeButtonText: '完成下单',
      cancelButtonText: '取消',
      unitPrice: '单价',
      totalPrice: '总价',
      time: '时间',
      details: '详情',
      dateAll: '全部',
      date1d: '1天内',
      date1w: '1周内',
      date1m: '1月内',
      date3m: '3月内',
      date6m: '6月内',
      date12m: '12月内',
      export: '导出',
      per: '个',
    },
    handle: {
      successMsg: '操作成功',
      handle: '操作',
      edit: '编辑',
      delete: '删除',
      confirmDeleteMsg: '确认删除吗？',
    },
    menu: {
      create: '创建',
      number: '序号',
      type: '类型',
      name: '名称',
      all: '全部',
      meat: '荤菜',
      vegetarian: '素菜',
    },
    validate: { required: '必填项', number: '数字类型' },
    stat: {
      totalDailyRevenue: '每日营收总额',
      productDailyRevenue: '每日各产品营收',
    },
    products: {
      OriginalCake: '原味饼',
      Squid: '鱿鱼',
      OrleansSteak: '奥尔良肉排',
      TengXiangChickenSteak: '藤香鸡排',
      SpicedMeatSkewers: '五香肉串',
      SichuanFlavoredTenderLoin: '川香里脊',
      SichuanChickenTenders: '川香鸡柳',
      CrabSteak: '蟹排',
      Bacon: '培根',
      HotDog: '热狗',
      FlavoredHamSlices: '风味火腿片',
      Egg: '鸡蛋',
      QianYeTofu: '千页豆腐',
      Gluten: '面筋',
      AllVegetarian: '所有素菜',
    },
    settings: { settings: '设置' },
  },
  en: {
    language: { language: 'Language', zh: 'Chinese', en: 'English' },
    currency: { name: 'USD', symbol: '$' },
    navbar: {
      dashboard: 'Cashier',
      menu: 'Menu',
      order: 'Order',
      stat: 'Statistics',
    },
    order: {
      name: 'Name',
      count: 'Count',
      emptyMsg: 'Empty',
      submit: 'Submit',
      confirmTitle: 'Order Confirmation',
      completeButtonText: 'Complete',
      cancelButtonText: 'Cancel',
      unitPrice: 'Price',
      totalPrice: 'Total',
      time: 'Time',
      details: 'Details',
      dateAll: 'All',
      date1d: '1 Day',
      date1w: '1 Week',
      date1m: '1 Month',
      date3m: '3 Month',
      date6m: '6 Month',
      date12m: '12 Month',
      export: 'Export',
      per: 'x',
    },
    handle: {
      successMsg: 'Success',
      handle: 'Oper',
      edit: 'Edit',
      delete: 'Delete',
      confirmDeleteMsg: 'Confirm delete?',
    },
    menu: {
      create: 'Create',
      number: 'Num',
      type: 'Type',
      name: 'Name',
      all: 'All',
      meat: 'Meat',
      vegetarian: 'Vegetarian',
    },
    validate: { required: 'Required', number: 'Number' },
    stat: {
      totalDailyRevenue: 'Total Daily Revenue',
      productDailyRevenue: 'Product Daily Revenue',
    },
    products: {
      OriginalCake: 'Original Cake',
      Squid: 'Squid',
      OrleansSteak: 'Orleans Steak',
      TengXiangChickenSteak: 'TengXian Chicken Steak',
      SpicedMeatSkewers: 'Spiced Meat Skewers',
      SichuanFlavoredTenderLoin: 'Sichuan Flavored Tender Loin',
      SichuanChickenTenders: 'Sichuan Chicken Tenders',
      CrabSteak: 'Crab Steak',
      Bacon: 'Bacon',
      HotDog: 'Hot Dog',
      FlavoredHamSlices: 'Flavored Ham Slices',
      Egg: 'Egg',
      QianYeTofu: 'QianYe Tofu',
      Gluten: 'Gluten',
      AllVegetarian: 'All Vegetarian',
    },
    settings: { settings: 'Settings' },
  },
};

const lang = ref<LangType>();

export const useLocale = () => {
  const setLang = (lang1: LangType) => {
    lang.value = lang1;
    localStorage.setItem('lang', lang1);
  };

  const localLang = (localStorage.getItem('lang') ||
    navigator.language.slice(0, 2)) as LangType;
  setLang(localLang);

  const locale = computed(() => CONFIG[lang.value]);

  return {
    lang,
    langs: Object.keys(CONFIG) as LangType[],
    setLang,
    locale,
  };
};
