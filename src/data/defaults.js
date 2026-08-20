/**
 * 预置数据与常量
 * Pre-set data and constants for Family Meal Ordering App
 */

// 分类标签
export const CATEGORIES = ['全部', '早餐', '主食', '面面', '肉肉', '菜菜', '果果', '甜甜', '小药'];

// 分类食物映射（用于食材聚合分类）
export const CAT_FOODS = {
  '早餐': ['煎蛋', '吐司', '豆浆', '小笼包', '油条', '牛奶', '面包', '包子', '馒头'],
  '主食': ['白米饭', '蛋炒饭', '馒头', '葱油饼', '米饭', '面条', '粉', '饼'],
  '面面': ['番茄鸡蛋面', '炸酱面', '阳春面', '炒米粉', '意面', '方便面', '拉面'],
  '肉肉': ['鸡翅', '牛肉', '排骨', '里脊', '五花肉', '鸡腿', '猪肉', '羊肉', '鸡肉', '鸭肉', '虾', '鱼', '培根', '火腿', '肥肠'],
  '菜菜': ['西兰花', '土豆', '番茄', '大葱', '蒜苔', '蒜黄', '蒜', '黄瓜', '胡萝卜', '白菜', '菠菜', '青椒', '洋葱', '茄子', '豆角', '芹菜', '生菜', '玉米', '蘑菇', '木耳', '豆腐', '鸡蛋'],
  '果果': ['苹果', '香蕉', '草莓', '橙子', '葡萄', '芒果', '西瓜', '蓝莓', '柠檬'],
  '甜甜': ['巧克力', '蛋糕', '布丁', '冰淇淋', '饼干', '糖果', '面包', '蛋挞'],
  '小药': ['健胃消食片', '维生素C', '感冒药'],
};

// 预置11道菜（带真实照片）
const DISH_PHOTO = (file) => import.meta.env.BASE_URL + 'dishes/' + file;

export const DEFAULT_DISHES = [
  {
    id: 'd1',
    name: '红烧肉',
    emoji: '🍖',
    photo: DISH_PHOTO('hongshaorou.jpg'),
    ingredients: [
      { name: '五花肉', amount: '500g' },
      { name: '冰糖', amount: '适量' },
      { name: '生抽', amount: '2勺' },
      { name: '老抽', amount: '1勺' },
      { name: '料酒', amount: '1勺' },
      { name: '姜', amount: '3片' },
      { name: '八角', amount: '2个' },
    ],
    categories: ['肉肉'],
    createdAt: new Date('2026-08-01').toISOString(),
  },
  {
    id: 'd2',
    name: '拍黄瓜',
    emoji: '🥒',
    photo: DISH_PHOTO('paihuanggua.jpg'),
    ingredients: [
      { name: '黄瓜', amount: '2根' },
      { name: '蒜', amount: '3瓣' },
      { name: '醋', amount: '2勺' },
      { name: '生抽', amount: '1勺' },
      { name: '盐', amount: '适量' },
      { name: '香油', amount: '少许' },
    ],
    categories: ['菜菜'],
    createdAt: new Date('2026-08-02').toISOString(),
  },
  {
    id: 'd3',
    name: '葱爆牛肉',
    emoji: '🥩',
    photo: DISH_PHOTO('congbaoniurou.jpg'),
    ingredients: [
      { name: '牛肉', amount: '200g' },
      { name: '大葱', amount: '2根' },
      { name: '生抽', amount: '1勺' },
      { name: '料酒', amount: '1勺' },
      { name: '姜', amount: '3片' },
    ],
    categories: ['肉肉'],
    createdAt: new Date('2026-08-03').toISOString(),
  },
  {
    id: 'd4',
    name: '小葱拌豆腐',
    emoji: '🍲',
    photo: DISH_PHOTO('xiaocongbandoufu.jpg'),
    ingredients: [
      { name: '内酯豆腐', amount: '1盒' },
      { name: '小葱', amount: '2根' },
      { name: '生抽', amount: '1勺' },
      { name: '香油', amount: '少许' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['菜菜'],
    createdAt: new Date('2026-08-04').toISOString(),
  },
  {
    id: 'd5',
    name: '溜肥肠',
    emoji: '🍲',
    photo: DISH_PHOTO('liufeichang.jpg'),
    ingredients: [
      { name: '肥肠', amount: '300g' },
      { name: '青椒', amount: '1个' },
      { name: '蒜', amount: '3瓣' },
      { name: '生抽', amount: '2勺' },
      { name: '料酒', amount: '1勺' },
      { name: '干辣椒', amount: '几个' },
    ],
    categories: ['肉肉'],
    createdAt: new Date('2026-08-05').toISOString(),
  },
  {
    id: 'd6',
    name: '凉拌土豆丝',
    emoji: '🥔',
    photo: DISH_PHOTO('liangbantudousi.jpg'),
    ingredients: [
      { name: '土豆', amount: '2个' },
      { name: '青椒', amount: '1个' },
      { name: '醋', amount: '2勺' },
      { name: '蒜', amount: '2瓣' },
      { name: '盐', amount: '适量' },
      { name: '香油', amount: '少许' },
    ],
    categories: ['菜菜'],
    createdAt: new Date('2026-08-06').toISOString(),
  },
  {
    id: 'd7',
    name: '土豆排骨炖豆角',
    emoji: '🍲',
    photo: DISH_PHOTO('tudoupaigudundoujiao.jpg'),
    ingredients: [
      { name: '排骨', amount: '500g' },
      { name: '土豆', amount: '2个' },
      { name: '豆角', amount: '200g' },
      { name: '生抽', amount: '2勺' },
      { name: '老抽', amount: '1勺' },
      { name: '姜', amount: '3片' },
      { name: '八角', amount: '2个' },
    ],
    categories: ['肉肉'],
    createdAt: new Date('2026-08-07').toISOString(),
  },
  {
    id: 'd8',
    name: '炒蒜苔',
    emoji: '🥬',
    photo: DISH_PHOTO('chaosuantai.jpg'),
    ingredients: [
      { name: '蒜苔', amount: '300g' },
      { name: '五花肉', amount: '100g' },
      { name: '生抽', amount: '1勺' },
      { name: '盐', amount: '适量' },
      { name: '姜', amount: '2片' },
    ],
    categories: ['菜菜'],
    createdAt: new Date('2026-08-08').toISOString(),
  },
  {
    id: 'd9',
    name: '西红柿炒鸡蛋',
    emoji: '🍳',
    photo: DISH_PHOTO('xihongshichaodan.jpg'),
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '少许' },
    ],
    categories: ['菜菜'],
    createdAt: new Date('2026-08-09').toISOString(),
  },
  {
    id: 'd10',
    name: '辣子鸡丁',
    emoji: '🌶️',
    photo: DISH_PHOTO('lazijiding.jpg'),
    ingredients: [
      { name: '鸡腿肉', amount: '300g' },
      { name: '干辣椒', amount: '若干' },
      { name: '花椒', amount: '适量' },
      { name: '姜', amount: '3片' },
      { name: '蒜', amount: '3瓣' },
      { name: '生抽', amount: '1勺' },
    ],
    categories: ['肉肉'],
    createdAt: new Date('2026-08-10').toISOString(),
  },
  {
    id: 'd11',
    name: '炒蒜黄',
    emoji: '🥚',
    photo: DISH_PHOTO('chaosuanhuang.jpg'),
    ingredients: [
      { name: '蒜黄', amount: '300g' },
      { name: '鸡蛋', amount: '2个' },
      { name: '盐', amount: '适量' },
      { name: '生抽', amount: '1勺' },
    ],
    categories: ['菜菜'],
    createdAt: new Date('2026-08-11').toISOString(),
  },
];

// 默认用户资料
export const DEFAULT_USER = {
  nickname: '今天吃什么呀',
  avatar: '🦊',
  kitchenName: '我的厨房',
};
