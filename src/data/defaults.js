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
  '肉肉': ['鸡翅', '牛肉', '排骨', '里脊', '五花肉', '鸡腿', '猪肉', '羊肉', '鸡肉', '鸭肉', '虾', '鱼', '培根', '火腿'],
  '菜菜': ['西兰花', '土豆', '番茄', '大葱', '蒜', '黄瓜', '胡萝卜', '白菜', '菠菜', '青椒', '洋葱', '茄子', '豆角', '芹菜', '生菜', '玉米', '蘑菇', '木耳', '豆腐', '鸡蛋'],
  '果果': ['苹果', '香蕉', '草莓', '橙子', '葡萄', '芒果', '西瓜', '蓝莓', '柠檬'],
  '甜甜': ['巧克力', '蛋糕', '布丁', '冰淇淋', '饼干', '糖果', '面包', '蛋挞'],
  '小药': ['健胃消食片', '维生素C', '感冒药'],
};

// 预置8道菜
export const DEFAULT_DISHES = [
  {
    id: 'd1',
    name: '可乐鸡翅',
    emoji: '🍗',
    ingredients: [
      { name: '鸡翅', amount: '500g' },
      { name: '可乐', amount: '1罐' },
      { name: '生抽', amount: '2勺' },
      { name: '料酒', amount: '1勺' },
      { name: '姜', amount: '3片' },
    ],
    categories: ['肉肉'],
    createdAt: new Date('2026-07-01').toISOString(),
  },
  {
    id: 'd2',
    name: '葱爆牛肉',
    emoji: '🥩',
    ingredients: [
      { name: '牛肉', amount: '200g' },
      { name: '大葱', amount: '2根' },
      { name: '生抽', amount: '1勺' },
      { name: '料酒', amount: '1勺' },
      { name: '姜', amount: '3片' },
    ],
    categories: ['肉肉'],
    createdAt: new Date('2026-07-02').toISOString(),
  },
  {
    id: 'd3',
    name: '蒜蓉西兰花',
    emoji: '🥬',
    ingredients: [
      { name: '西兰花', amount: '1颗' },
      { name: '蒜', amount: '3瓣' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['菜菜'],
    createdAt: new Date('2026-07-03').toISOString(),
  },
  {
    id: 'd4',
    name: '番茄炒蛋',
    emoji: '🍳',
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '少许' },
    ],
    categories: ['菜菜'],
    createdAt: new Date('2026-07-04').toISOString(),
  },
  {
    id: 'd5',
    name: '红烧排骨',
    emoji: '🍖',
    ingredients: [
      { name: '排骨', amount: '500g' },
      { name: '生抽', amount: '2勺' },
      { name: '老抽', amount: '1勺' },
      { name: '料酒', amount: '1勺' },
      { name: '冰糖', amount: '适量' },
      { name: '姜', amount: '3片' },
    ],
    categories: ['肉肉'],
    createdAt: new Date('2026-07-05').toISOString(),
  },
  {
    id: 'd6',
    name: '酸辣土豆丝',
    emoji: '🥔',
    ingredients: [
      { name: '土豆', amount: '2个' },
      { name: '干辣椒', amount: '几个' },
      { name: '醋', amount: '1勺' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['菜菜'],
    createdAt: new Date('2026-07-06').toISOString(),
  },
  {
    id: 'd7',
    name: '蛋炒饭',
    emoji: '🍚',
    ingredients: [
      { name: '米饭', amount: '一碗' },
      { name: '鸡蛋', amount: '2个' },
      { name: '葱', amount: '适量' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['主食'],
    createdAt: new Date('2026-07-07').toISOString(),
  },
  {
    id: 'd8',
    name: '番茄鸡蛋面',
    emoji: '🍜',
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '2个' },
      { name: '面条', amount: '200g' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['面面'],
    createdAt: new Date('2026-07-08').toISOString(),
  },
];

// 默认用户资料
export const DEFAULT_USER = {
  nickname: '今天吃什么呀',
  avatar: '🦊',
  kitchenName: '我的厨房',
};
