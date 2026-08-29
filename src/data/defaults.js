/**
 * 预置数据与常量
 * Pre-set data and constants for Family Meal Ordering App
 */

// 分类标签
export const CATEGORIES = ['全部', '烧炖焖煮', '小炒--荤', '小炒--素', '凉菜--荤', '凉菜--素', '主食碳水', '酒水饮料', '水果甜品'];

// 分类食物映射（用于食材聚合分类）
export const CAT_FOODS = {
  '早餐': ['煎蛋', '吐司', '豆浆', '小笼包', '油条', '牛奶', '面包', '包子', '馒头'],
  '主食': ['白米饭', '蛋炒饭', '馒头', '葱油饼', '米饭', '面条', '粉', '饼'],
  '面面': ['番茄鸡蛋面', '炸酱面', '阳春面', '炒米粉', '意面', '方便面', '拉面'],
  '肉肉': ['鸡翅', '牛肉', '排骨', '里脊', '五花肉', '鸡腿', '猪肉', '羊肉', '鸡肉', '鸭肉', '虾', '鱼', '培根', '火腿', '肥肠', '花蛤', '午餐肉'],
  '菜菜': ['西兰花', '土豆', '番茄', '大葱', '蒜苔', '蒜黄', '蒜', '黄瓜', '胡萝卜', '白菜', '菠菜', '青椒', '尖椒', '洋葱', '茄子', '豆角', '芹菜', '生菜', '玉米', '蘑菇', '木耳', '豆腐', '鸡蛋', '油菜', '萝卜', '藕', '金针菇'],
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
    categories: ['烧炖焖煮'],
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
    categories: ['凉菜--素'],
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
    categories: ['小炒--荤'],
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
    categories: ['凉菜--素'],
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
    categories: ['小炒--荤'],
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
    categories: ['凉菜--素'],
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
    categories: ['烧炖焖煮'],
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
    categories: ['小炒--荤'],
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
    categories: ['小炒--素'],
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
    categories: ['小炒--荤'],
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
    categories: ['小炒--素'],
    createdAt: new Date('2026-08-11').toISOString(),
  },
  {
    id: 'd12',
    name: '咖喱鸡肉',
    emoji: '🍛',
    photo: DISH_PHOTO('galijirou.jpg'),
    ingredients: [
      { name: '鸡腿肉', amount: '300g' },
      { name: '土豆', amount: '1个' },
      { name: '胡萝卜', amount: '1根' },
      { name: '洋葱', amount: '半个' },
      { name: '咖喱块', amount: '适量' },
    ],
    categories: ['烧炖焖煮'],
    createdAt: new Date('2026-08-12').toISOString(),
  },
  {
    id: 'd13',
    name: '水煮虾',
    emoji: '🦐',
    photo: DISH_PHOTO('shuizhuxia.jpg'),
    ingredients: [
      { name: '基围虾', amount: '500g' },
      { name: '姜', amount: '3片' },
      { name: '葱', amount: '2段' },
      { name: '料酒', amount: '1勺' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['烧炖焖煮'],
    createdAt: new Date('2026-08-13').toISOString(),
  },
  {
    id: 'd14',
    name: '东北酱炖鱼',
    emoji: '🐟',
    photo: DISH_PHOTO('dongbeijiangdunyu.jpg'),
    ingredients: [
      { name: '鲤鱼', amount: '1条' },
      { name: '黄豆酱', amount: '2勺' },
      { name: '葱', amount: '2段' },
      { name: '姜', amount: '3片' },
      { name: '蒜', amount: '3瓣' },
      { name: '生抽', amount: '1勺' },
      { name: '料酒', amount: '2勺' },
    ],
    categories: ['烧炖焖煮'],
    createdAt: new Date('2026-08-14').toISOString(),
  },
  {
    id: 'd15',
    name: '辣炒花蛤',
    emoji: '🐚',
    photo: DISH_PHOTO('lachaohuage.jpg'),
    ingredients: [
      { name: '花蛤', amount: '500g' },
      { name: '干辣椒', amount: '几个' },
      { name: '蒜', amount: '3瓣' },
      { name: '姜', amount: '2片' },
      { name: '生抽', amount: '1勺' },
      { name: '料酒', amount: '1勺' },
    ],
    categories: ['小炒--荤'],
    createdAt: new Date('2026-08-15').toISOString(),
  },
  {
    id: 'd16',
    name: '尖椒炒鸡蛋',
    emoji: '🫑',
    photo: DISH_PHOTO('jianjiaochaojidan.jpg'),
    ingredients: [
      { name: '尖椒', amount: '3个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '盐', amount: '适量' },
      { name: '生抽', amount: '1勺' },
    ],
    categories: ['小炒--素'],
    createdAt: new Date('2026-08-16').toISOString(),
  },
  {
    id: 'd17',
    name: '可乐鸡翅',
    emoji: '🍗',
    photo: DISH_PHOTO('kelejichi.jpg'),
    ingredients: [
      { name: '鸡翅', amount: '500g' },
      { name: '可乐', amount: '1罐' },
      { name: '生抽', amount: '2勺' },
      { name: '料酒', amount: '1勺' },
      { name: '姜', amount: '3片' },
    ],
    categories: ['烧炖焖煮'],
    createdAt: new Date('2026-08-17').toISOString(),
  },
  {
    id: 'd18',
    name: '清炒小油菜',
    emoji: '🥬',
    photo: DISH_PHOTO('qingchaoxiaoyoucai.jpg'),
    ingredients: [
      { name: '小油菜', amount: '300g' },
      { name: '蒜', amount: '2瓣' },
      { name: '盐', amount: '适量' },
      { name: '油', amount: '适量' },
    ],
    categories: ['小炒--素'],
    createdAt: new Date('2026-08-18').toISOString(),
  },
  {
    id: 'd19',
    name: '招牌炸酱面',
    emoji: '🍜',
    photo: DISH_PHOTO('zhaopaizhajiangmian.jpg'),
    ingredients: [
      { name: '面条', amount: '200g' },
      { name: '五花肉', amount: '150g' },
      { name: '黄豆酱', amount: '2勺' },
      { name: '甜面酱', amount: '1勺' },
      { name: '黄瓜丝', amount: '适量' },
      { name: '葱', amount: '2根' },
    ],
    categories: ['主食碳水'],
    createdAt: new Date('2026-08-19').toISOString(),
  },
  {
    id: 'd20',
    name: '黄金蛋炒饭',
    emoji: '🍚',
    photo: DISH_PHOTO('huangjindanchaofan.jpg'),
    ingredients: [
      { name: '米饭', amount: '1碗' },
      { name: '鸡蛋', amount: '2个' },
      { name: '葱', amount: '适量' },
      { name: '盐', amount: '适量' },
      { name: '油', amount: '适量' },
    ],
    categories: ['主食碳水'],
    createdAt: new Date('2026-08-20').toISOString(),
  },
  {
    id: 'd21',
    name: '蘸酱菜',
    emoji: '🥗',
    photo: DISH_PHOTO('zhanjiangcai.jpg'),
    ingredients: [
      { name: '黄瓜', amount: '1根' },
      { name: '生菜', amount: '1颗' },
      { name: '水萝卜', amount: '2个' },
      { name: '葱白', amount: '2段' },
      { name: '黄豆酱', amount: '适量' },
    ],
    categories: ['凉菜--素'],
    createdAt: new Date('2026-08-21').toISOString(),
  },
  {
    id: 'd22',
    name: '香辣肉丝',
    emoji: '🌶️',
    photo: DISH_PHOTO('xianglarousi.jpg'),
    ingredients: [
      { name: '里脊肉', amount: '300g' },
      { name: '青椒', amount: '1个' },
      { name: '红椒', amount: '1个' },
      { name: '干辣椒', amount: '几个' },
      { name: '蒜', amount: '2瓣' },
      { name: '生抽', amount: '1勺' },
    ],
    categories: ['小炒--荤'],
    createdAt: new Date('2026-08-22').toISOString(),
  },
  {
    id: 'd23',
    name: '麻辣香锅',
    emoji: '🍲',
    photo: DISH_PHOTO('malaxiangguo.jpg'),
    ingredients: [
      { name: '虾', amount: '200g' },
      { name: '午餐肉', amount: '100g' },
      { name: '藕片', amount: '100g' },
      { name: '金针菇', amount: '100g' },
      { name: '土豆', amount: '1个' },
      { name: '麻辣香锅底料', amount: '适量' },
    ],
    categories: ['小炒--荤'],
    createdAt: new Date('2026-08-23').toISOString(),
  },
  {
    id: 'd24',
    name: '烤红薯',
    emoji: '🍠',
    photo: DISH_PHOTO('kaohongshu.jpg'),
    ingredients: [
      { name: '红薯', amount: '2个' },
    ],
    categories: ['主食碳水'],
    createdAt: new Date('2026-08-24').toISOString(),
  },
  {
    id: 'd25',
    name: '水煮豆腐',
    emoji: '🥣',
    photo: DISH_PHOTO('shuizhudoufu.jpg'),
    ingredients: [
      { name: '豆腐', amount: '1块' },
      { name: '小葱', amount: '2根' },
      { name: '生抽', amount: '2勺' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['烧炖焖煮'],
    createdAt: new Date('2026-08-24').toISOString(),
  },
  {
    id: 'd26',
    name: '凉拌鸡胸肉',
    emoji: '🥗',
    photo: DISH_PHOTO('liangbanjixiongrou.jpg'),
    ingredients: [
      { name: '鸡胸肉', amount: '1块' },
      { name: '黄瓜', amount: '1根' },
      { name: '蒜', amount: '3瓣' },
      { name: '生抽', amount: '2勺' },
      { name: '醋', amount: '1勺' },
      { name: '香油', amount: '少许' },
    ],
    categories: ['凉菜--荤'],
    createdAt: new Date('2026-08-24').toISOString(),
  },
  {
    id: 'd27',
    name: '白菜炖豆腐',
    emoji: '🥬',
    photo: DISH_PHOTO('baicaidundoufu.jpg'),
    ingredients: [
      { name: '白菜', amount: '半颗' },
      { name: '豆腐', amount: '1块' },
      { name: '姜', amount: '2片' },
      { name: '盐', amount: '适量' },
      { name: '食用油', amount: '适量' },
    ],
    categories: ['烧炖焖煮'],
    createdAt: new Date('2026-08-25').toISOString(),
  },
  {
    id: 'd28',
    name: '鸡蛋饼',
    emoji: '🥞',
    photo: DISH_PHOTO('jidanbing.jpg'),
    ingredients: [
      { name: '鸡蛋', amount: '3个' },
      { name: '面粉', amount: '100g' },
      { name: '小葱', amount: '2根' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['主食碳水'],
    createdAt: new Date('2026-08-25').toISOString(),
  },
  {
    id: 'd29',
    name: '米饭',
    emoji: '🍚',
    photo: DISH_PHOTO('mifan.jpg'),
    ingredients: [
      { name: '大米', amount: '2杯' },
      { name: '水', amount: '适量' },
    ],
    categories: ['主食碳水'],
    createdAt: new Date('2026-08-25').toISOString(),
  },
  {
    id: 'd30',
    name: '馒头',
    emoji: '🍞',
    photo: DISH_PHOTO('mantou.jpg'),
    ingredients: [
      { name: '面粉', amount: '500g' },
      { name: '酵母', amount: '5g' },
      { name: '水', amount: '适量' },
    ],
    categories: ['主食碳水'],
    createdAt: new Date('2026-08-25').toISOString(),
  },
  {
    id: 'd31',
    name: '芹菜炒肉',
    emoji: '🥩',
    photo: DISH_PHOTO('qincaichaorou.jpg'),
    ingredients: [
      { name: '芹菜', amount: '300g' },
      { name: '猪肉', amount: '150g' },
      { name: '蒜', amount: '2瓣' },
      { name: '生抽', amount: '1勺' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['小炒--荤'],
    createdAt: new Date('2026-08-25').toISOString(),
  },
  {
    id: 'd32',
    name: '尖椒土豆片',
    emoji: '🥔',
    photo: DISH_PHOTO('jianjiaotudoupian.jpg'),
    ingredients: [
      { name: '土豆', amount: '2个' },
      { name: '尖椒', amount: '2个' },
      { name: '蒜', amount: '2瓣' },
      { name: '盐', amount: '适量' },
      { name: '生抽', amount: '1勺' },
    ],
    categories: ['小炒--素'],
    createdAt: new Date('2026-08-25').toISOString(),
  },
];

/**
 * 内置菜单新增菜（v2 家常清单 56 道）
 * 只读内置库，不随用户操作变化；用户可从中挑选复制进个人菜单
 */
const BUILTIN_NEW_DISHES = [
  // ── 烧炖焖煮（+8）──
  {
    id: 'b1', name: '番茄炖牛腩', emoji: '🍅', photo: DISH_PHOTO('fanqiedunniunan.jpg'),
    ingredients: [
      { name: '牛腩', amount: '500g' }, { name: '番茄', amount: '2个' },
      { name: '洋葱', amount: '半个' }, { name: '姜', amount: '3片' },
      { name: '生抽', amount: '1勺' }, { name: '料酒', amount: '1勺' },
    ],
    categories: ['烧炖焖煮'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b2', name: '小鸡炖蘑菇', emoji: '🍄', photo: DISH_PHOTO('xiaojidunmogu.jpg'),
    ingredients: [
      { name: '鸡块', amount: '500g' }, { name: '榛蘑', amount: '100g' },
      { name: '粉条', amount: '100g' }, { name: '葱', amount: '2段' },
      { name: '姜', amount: '3片' }, { name: '盐', amount: '适量' },
    ],
    categories: ['烧炖焖煮'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b3', name: '排骨炖玉米', emoji: '🌽', photo: DISH_PHOTO('paigudunyumi.jpg'),
    ingredients: [
      { name: '排骨', amount: '500g' }, { name: '玉米', amount: '2根' },
      { name: '胡萝卜', amount: '1根' }, { name: '姜', amount: '3片' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['烧炖焖煮'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b4', name: '酱大骨头', emoji: '🦴', photo: DISH_PHOTO('jiangdagutou.jpg'),
    ingredients: [
      { name: '猪大骨', amount: '1000g' }, { name: '黄豆酱', amount: '3勺' },
      { name: '八角', amount: '2个' }, { name: '桂皮', amount: '1块' },
      { name: '姜', amount: '3片' }, { name: '生抽', amount: '2勺' },
    ],
    categories: ['烧炖焖煮'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b5', name: '啤酒鸭', emoji: '🍺', photo: DISH_PHOTO('pijiuya.jpg'),
    ingredients: [
      { name: '鸭肉', amount: '500g' }, { name: '啤酒', amount: '1罐' },
      { name: '青椒', amount: '1个' }, { name: '姜', amount: '3片' },
      { name: '蒜', amount: '3瓣' }, { name: '生抽', amount: '2勺' },
    ],
    categories: ['烧炖焖煮'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b6', name: '酸菜汆白肉', emoji: '🥬', photo: DISH_PHOTO('suancaicuanbairou.jpg'),
    ingredients: [
      { name: '酸菜', amount: '300g' }, { name: '五花肉', amount: '300g' },
      { name: '粉条', amount: '100g' }, { name: '葱', amount: '2段' },
      { name: '姜', amount: '3片' },
    ],
    categories: ['烧炖焖煮'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b7', name: '冬瓜丸子汤', emoji: '🍲', photo: DISH_PHOTO('dongguawanzitang.jpg'),
    ingredients: [
      { name: '冬瓜', amount: '300g' }, { name: '猪肉末', amount: '200g' },
      { name: '鸡蛋', amount: '1个' }, { name: '葱', amount: '2根' },
      { name: '姜', amount: '3片' }, { name: '盐', amount: '适量' },
    ],
    categories: ['烧炖焖煮'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b8', name: '莲藕炖排骨', emoji: '🪷', photo: DISH_PHOTO('lianoudunpaigu.jpg'),
    ingredients: [
      { name: '排骨', amount: '500g' }, { name: '莲藕', amount: '1节' },
      { name: '姜', amount: '3片' }, { name: '盐', amount: '适量' },
      { name: '料酒', amount: '1勺' },
    ],
    categories: ['烧炖焖煮'], createdAt: new Date('2026-08-26').toISOString(),
  },
  // ── 小炒--荤（+8）──
  {
    id: 'b9', name: '青椒肉丝', emoji: '🫑', photo: DISH_PHOTO('qingjiaorousi.jpg'),
    ingredients: [
      { name: '猪里脊', amount: '200g' }, { name: '青椒', amount: '2个' },
      { name: '蒜', amount: '2瓣' }, { name: '生抽', amount: '1勺' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['小炒--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b10', name: '鱼香肉丝', emoji: '🥢', photo: DISH_PHOTO('yuxiangrousi.jpg'),
    ingredients: [
      { name: '里脊', amount: '200g' }, { name: '木耳', amount: '50g' },
      { name: '胡萝卜', amount: '半根' }, { name: '泡椒', amount: '适量' },
      { name: '笋丝', amount: '50g' }, { name: '蒜', amount: '2瓣' },
      { name: '豆瓣酱', amount: '1勺' },
    ],
    categories: ['小炒--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b11', name: '宫保鸡丁', emoji: '🐔', photo: DISH_PHOTO('gongbaojiding.jpg'),
    ingredients: [
      { name: '鸡腿肉', amount: '300g' }, { name: '花生米', amount: '50g' },
      { name: '干辣椒', amount: '几个' }, { name: '黄瓜', amount: '1根' },
      { name: '葱', amount: '1根' }, { name: '生抽', amount: '1勺' },
    ],
    categories: ['小炒--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b12', name: '回锅肉', emoji: '🥓', photo: DISH_PHOTO('huiguorou.jpg'),
    ingredients: [
      { name: '五花肉', amount: '300g' }, { name: '青蒜', amount: '2根' },
      { name: '豆瓣酱', amount: '1勺' }, { name: '豆豉', amount: '1勺' },
      { name: '蒜', amount: '2瓣' },
    ],
    categories: ['小炒--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b13', name: '木须肉', emoji: '🥚', photo: DISH_PHOTO('muxurou.jpg'),
    ingredients: [
      { name: '鸡蛋', amount: '2个' }, { name: '猪里脊', amount: '150g' },
      { name: '木耳', amount: '50g' }, { name: '黄瓜', amount: '半根' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['小炒--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b14', name: '洋葱炒牛肉', emoji: '🧅', photo: DISH_PHOTO('yangcongchaoniurou.jpg'),
    ingredients: [
      { name: '牛肉', amount: '200g' }, { name: '洋葱', amount: '1个' },
      { name: '黑胡椒', amount: '适量' }, { name: '生抽', amount: '1勺' },
      { name: '料酒', amount: '1勺' },
    ],
    categories: ['小炒--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b15', name: '肉末烧豆腐', emoji: '🍮', photo: DISH_PHOTO('roumoshiaodoufu.jpg'),
    ingredients: [
      { name: '豆腐', amount: '1块' }, { name: '猪肉末', amount: '100g' },
      { name: '豆瓣酱', amount: '1勺' }, { name: '葱花', amount: '适量' },
      { name: '生抽', amount: '1勺' },
    ],
    categories: ['小炒--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b16', name: '蒜苔炒腊肉', emoji: '🥩', photo: DISH_PHOTO('suantaichaolarou.jpg'),
    ingredients: [
      { name: '腊肉', amount: '150g' }, { name: '蒜苔', amount: '300g' },
      { name: '干辣椒', amount: '几个' }, { name: '生抽', amount: '1勺' },
    ],
    categories: ['小炒--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  // ── 小炒--素（+8）──
  {
    id: 'b17', name: '醋溜白菜', emoji: '🥬', photo: DISH_PHOTO('culiubaicai.jpg'),
    ingredients: [
      { name: '大白菜', amount: '半颗' }, { name: '干辣椒', amount: '几个' },
      { name: '醋', amount: '2勺' }, { name: '蒜', amount: '2瓣' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['小炒--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b18', name: '地三鲜', emoji: '🍆', photo: DISH_PHOTO('disanxian.jpg'),
    ingredients: [
      { name: '茄子', amount: '1个' }, { name: '土豆', amount: '1个' },
      { name: '青椒', amount: '1个' }, { name: '蒜', amount: '2瓣' },
      { name: '生抽', amount: '1勺' },
    ],
    categories: ['小炒--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b19', name: '干煸豆角', emoji: '🫛', photo: DISH_PHOTO('ganbiandoujiao.jpg'),
    ingredients: [
      { name: '豆角', amount: '300g' }, { name: '干辣椒', amount: '几个' },
      { name: '花椒', amount: '适量' }, { name: '蒜', amount: '2瓣' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['小炒--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b20', name: '清炒西兰花', emoji: '🥦', photo: DISH_PHOTO('qingchaoxilanhua.jpg'),
    ingredients: [
      { name: '西兰花', amount: '1颗' }, { name: '蒜', amount: '2瓣' },
      { name: '蚝油', amount: '1勺' }, { name: '盐', amount: '适量' },
    ],
    categories: ['小炒--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b21', name: '蒜蓉油麦菜', emoji: '🥗', photo: DISH_PHOTO('suanrongyoumaicai.jpg'),
    ingredients: [
      { name: '油麦菜', amount: '300g' }, { name: '蒜', amount: '3瓣' },
      { name: '蚝油', amount: '1勺' }, { name: '盐', amount: '适量' },
    ],
    categories: ['小炒--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b22', name: '蚝油生菜', emoji: '🥬', photo: DISH_PHOTO('haoyoushengcai.jpg'),
    ingredients: [
      { name: '生菜', amount: '1颗' }, { name: '蚝油', amount: '1勺' },
      { name: '蒜', amount: '2瓣' }, { name: '油', amount: '适量' },
    ],
    categories: ['小炒--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b23', name: '手撕包菜', emoji: '🥬', photo: DISH_PHOTO('shousibaocai.jpg'),
    ingredients: [
      { name: '包菜', amount: '半颗' }, { name: '干辣椒', amount: '几个' },
      { name: '花椒', amount: '适量' }, { name: '蒜', amount: '2瓣' },
    ],
    categories: ['小炒--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b24', name: '酸辣土豆丝', emoji: '🥔', photo: DISH_PHOTO('suanlatudousi.jpg'),
    ingredients: [
      { name: '土豆', amount: '2个' }, { name: '干辣椒', amount: '几个' },
      { name: '醋', amount: '2勺' }, { name: '花椒', amount: '适量' },
      { name: '盐', amount: '适量' },
    ],
    categories: ['小炒--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  // ── 凉菜--荤（+6）──
  {
    id: 'b25', name: '口水鸡', emoji: '🐔', photo: DISH_PHOTO('koushuiji.jpg'),
    ingredients: [
      { name: '鸡腿', amount: '2个' }, { name: '辣椒油', amount: '2勺' },
      { name: '花生碎', amount: '适量' }, { name: '芝麻', amount: '适量' },
      { name: '香菜', amount: '2根' },
    ],
    categories: ['凉菜--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b26', name: '蒜泥白肉', emoji: '🥓', photo: DISH_PHOTO('suannibairou.jpg'),
    ingredients: [
      { name: '五花肉', amount: '300g' }, { name: '蒜泥', amount: '3勺' },
      { name: '辣椒油', amount: '1勺' }, { name: '黄瓜', amount: '1根' },
      { name: '生抽', amount: '1勺' },
    ],
    categories: ['凉菜--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b27', name: '凉拌猪耳', emoji: '🐷', photo: DISH_PHOTO('liangbanzhuer.jpg'),
    ingredients: [
      { name: '猪耳', amount: '1只' }, { name: '黄瓜', amount: '半根' },
      { name: '蒜', amount: '2瓣' }, { name: '辣椒油', amount: '1勺' },
      { name: '生抽', amount: '1勺' },
    ],
    categories: ['凉菜--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b28', name: '凉拌鸡爪', emoji: '🍗', photo: DISH_PHOTO('liangbanjizhua.jpg'),
    ingredients: [
      { name: '鸡爪', amount: '500g' }, { name: '柠檬', amount: '半个' },
      { name: '小米椒', amount: '3个' }, { name: '蒜', amount: '2瓣' },
      { name: '生抽', amount: '2勺' },
    ],
    categories: ['凉菜--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b29', name: '白切鸡', emoji: '🍗', photo: DISH_PHOTO('baiqieji.jpg'),
    ingredients: [
      { name: '三黄鸡', amount: '半只' }, { name: '姜', amount: '3片' },
      { name: '葱', amount: '2根' }, { name: '生抽', amount: '2勺' },
    ],
    categories: ['凉菜--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b30', name: '酱牛肉', emoji: '🐮', photo: DISH_PHOTO('jiangniurou.jpg'),
    ingredients: [
      { name: '牛腱子', amount: '500g' }, { name: '黄豆酱', amount: '2勺' },
      { name: '八角', amount: '2个' }, { name: '桂皮', amount: '1块' },
      { name: '姜', amount: '3片' },
    ],
    categories: ['凉菜--荤'], createdAt: new Date('2026-08-26').toISOString(),
  },
  // ── 凉菜--素（+7）──
  {
    id: 'b31', name: '凉拌木耳', emoji: '🍄', photo: DISH_PHOTO('liangbanmuer.jpg'),
    ingredients: [
      { name: '黑木耳', amount: '100g' }, { name: '蒜', amount: '2瓣' },
      { name: '小米椒', amount: '2个' }, { name: '香菜', amount: '2根' },
      { name: '生抽', amount: '1勺' },
    ],
    categories: ['凉菜--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b32', name: '凉拌海带丝', emoji: '🌊', photo: DISH_PHOTO('liangbanhaidaisi.jpg'),
    ingredients: [
      { name: '海带丝', amount: '300g' }, { name: '蒜', amount: '2瓣' },
      { name: '辣椒油', amount: '1勺' }, { name: '醋', amount: '1勺' },
    ],
    categories: ['凉菜--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b33', name: '凉拌腐竹', emoji: '🥢', photo: DISH_PHOTO('liangbanfuzhu.jpg'),
    ingredients: [
      { name: '腐竹', amount: '100g' }, { name: '黄瓜', amount: '半根' },
      { name: '花生米', amount: '50g' }, { name: '蒜', amount: '2瓣' },
    ],
    categories: ['凉菜--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b34', name: '皮蛋豆腐', emoji: '🥚', photo: DISH_PHOTO('pidandoufu.jpg'),
    ingredients: [
      { name: '内酯豆腐', amount: '1盒' }, { name: '皮蛋', amount: '2个' },
      { name: '葱花', amount: '适量' }, { name: '生抽', amount: '1勺' },
    ],
    categories: ['凉菜--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b35', name: '凉拌藕片', emoji: '🪷', photo: DISH_PHOTO('liangbanoupian.jpg'),
    ingredients: [
      { name: '莲藕', amount: '1节' }, { name: '小米椒', amount: '2个' },
      { name: '白醋', amount: '1勺' }, { name: '蒜', amount: '2瓣' },
    ],
    categories: ['凉菜--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b36', name: '凉拌菠菜', emoji: '🥬', photo: DISH_PHOTO('liangbanbocai.jpg'),
    ingredients: [
      { name: '菠菜', amount: '300g' }, { name: '蒜', amount: '2瓣' },
      { name: '芝麻', amount: '适量' }, { name: '香油', amount: '少许' },
    ],
    categories: ['凉菜--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b37', name: '糖拌西红柿', emoji: '🍅', photo: DISH_PHOTO('tangbanxihongshi.jpg'),
    ingredients: [
      { name: '西红柿', amount: '2个' }, { name: '白糖', amount: '2勺' },
    ],
    categories: ['凉菜--素'], createdAt: new Date('2026-08-26').toISOString(),
  },
  // ── 主食碳水（+8）──
  {
    id: 'b38', name: '番茄鸡蛋面', emoji: '🍜', photo: DISH_PHOTO('fanqiejidanmian.jpg'),
    ingredients: [
      { name: '挂面', amount: '200g' }, { name: '番茄', amount: '1个' },
      { name: '鸡蛋', amount: '2个' }, { name: '葱花', amount: '适量' },
    ],
    categories: ['主食碳水'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b39', name: '葱油拌面', emoji: '🍝', photo: DISH_PHOTO('congyoubanmian.jpg'),
    ingredients: [
      { name: '细面条', amount: '200g' }, { name: '小葱', amount: '4根' },
      { name: '酱油', amount: '2勺' }, { name: '油', amount: '适量' },
    ],
    categories: ['主食碳水'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b40', name: '猪肉大葱饺子', emoji: '🥟', photo: DISH_PHOTO('zhuroudacongjiaozi.jpg'),
    ingredients: [
      { name: '饺子皮', amount: '500g' }, { name: '猪肉', amount: '300g' },
      { name: '大葱', amount: '2根' }, { name: '姜', amount: '3片' },
    ],
    categories: ['主食碳水'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b41', name: '猪肉白菜包子', emoji: '🥟', photo: DISH_PHOTO('zhuroubaicaibaozi.jpg'),
    ingredients: [
      { name: '面粉', amount: '500g' }, { name: '猪肉', amount: '300g' },
      { name: '白菜', amount: '半颗' }, { name: '葱', amount: '2根' },
      { name: '姜', amount: '3片' },
    ],
    categories: ['主食碳水'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b42', name: '方便面', emoji: '🍜', photo: DISH_PHOTO('fangbianmian.jpg'),
    ingredients: [
      { name: '方便面', amount: '1包' }, { name: '鸡蛋', amount: '1个' },
      { name: '青菜', amount: '适量' }, { name: '火腿肠', amount: '1根' },
    ],
    categories: ['主食碳水'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b43', name: '葱油饼', emoji: '🫓', photo: DISH_PHOTO('congyoubing.jpg'),
    ingredients: [
      { name: '面粉', amount: '300g' }, { name: '小葱', amount: '3根' },
      { name: '油', amount: '适量' }, { name: '盐', amount: '适量' },
    ],
    categories: ['主食碳水'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b44', name: '韭菜盒子', emoji: '🥟', photo: DISH_PHOTO('jiucahezi.jpg'),
    ingredients: [
      { name: '面粉', amount: '300g' }, { name: '韭菜', amount: '200g' },
      { name: '鸡蛋', amount: '2个' }, { name: '粉丝', amount: '50g' },
    ],
    categories: ['主食碳水'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b45', name: '小米粥', emoji: '🥣', photo: DISH_PHOTO('xiaomizhou.jpg'),
    ingredients: [
      { name: '小米', amount: '100g' }, { name: '水', amount: '适量' },
    ],
    categories: ['主食碳水'], createdAt: new Date('2026-08-26').toISOString(),
  },
  // ── 酒水饮料（+5）──
  {
    id: 'b46', name: '可乐', emoji: '🥤', photo: DISH_PHOTO('kele.jpg'),
    ingredients: [
      { name: '可乐', amount: '1瓶（冰箱常备）' },
    ],
    categories: ['酒水饮料'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b47', name: '啤酒', emoji: '🍺', photo: DISH_PHOTO('pijiu.jpg'),
    ingredients: [
      { name: '啤酒', amount: '1罐（冰箱常备）' },
    ],
    categories: ['酒水饮料'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b48', name: '酸梅汤', emoji: '🧃', photo: DISH_PHOTO('suanmeitang.jpg'),
    ingredients: [
      { name: '乌梅', amount: '50g' }, { name: '山楂', amount: '20g' },
      { name: '冰糖', amount: '适量' }, { name: '桂花', amount: '少许' },
    ],
    categories: ['酒水饮料'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b49', name: '绿豆汤', emoji: '🍵', photo: DISH_PHOTO('lvdoutang.jpg'),
    ingredients: [
      { name: '绿豆', amount: '150g' }, { name: '冰糖', amount: '适量' },
    ],
    categories: ['酒水饮料'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b50', name: '豆浆', emoji: '🥛', photo: DISH_PHOTO('doujiang.jpg'),
    ingredients: [
      { name: '黄豆', amount: '100g' }, { name: '水', amount: '适量' },
    ],
    categories: ['酒水饮料'], createdAt: new Date('2026-08-26').toISOString(),
  },
  // ── 水果甜品（+6）──
  {
    id: 'b51', name: '冰糖雪梨', emoji: '🍐', photo: DISH_PHOTO('bingtangxueli.jpg'),
    ingredients: [
      { name: '雪梨', amount: '2个' }, { name: '冰糖', amount: '适量' },
      { name: '枸杞', amount: '少许' },
    ],
    categories: ['水果甜品'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b52', name: '银耳莲子羹', emoji: '🥣', photo: DISH_PHOTO('yinerlianzigeng.jpg'),
    ingredients: [
      { name: '银耳', amount: '1朵' }, { name: '莲子', amount: '50g' },
      { name: '红枣', amount: '8颗' }, { name: '冰糖', amount: '适量' },
    ],
    categories: ['水果甜品'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b53', name: '酸奶水果捞', emoji: '🍓', photo: DISH_PHOTO('suannaishuiguolao.jpg'),
    ingredients: [
      { name: '酸奶', amount: '1盒' }, { name: '草莓', amount: '适量' },
      { name: '香蕉', amount: '1根' }, { name: '蓝莓', amount: '适量' },
      { name: '芒果', amount: '1个' },
    ],
    categories: ['水果甜品'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b54', name: '拔丝地瓜', emoji: '🍠', photo: DISH_PHOTO('basidigua.jpg'),
    ingredients: [
      { name: '红薯', amount: '2个' }, { name: '白糖', amount: '100g' },
      { name: '油', amount: '适量' },
    ],
    categories: ['水果甜品'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b55', name: '红糖糍粑', emoji: '🍡', photo: DISH_PHOTO('hongtangciba.jpg'),
    ingredients: [
      { name: '糯米粉', amount: '300g' }, { name: '红糖', amount: '50g' },
      { name: '黄豆粉', amount: '适量' },
    ],
    categories: ['水果甜品'], createdAt: new Date('2026-08-26').toISOString(),
  },
  {
    id: 'b56', name: '红豆沙', emoji: '🍧', photo: DISH_PHOTO('hongdousha.jpg'),
    ingredients: [
      { name: '红豆', amount: '200g' }, { name: '冰糖', amount: '适量' },
    ],
    categories: ['水果甜品'], createdAt: new Date('2026-08-26').toISOString(),
  },
];

/**
 * 内置菜单（88 道 = 默认 32 + 新增 56）
 * 只读参考库：不写入 localStorage、不随用户操作变化；
 * 用户可从内置菜单挑选菜品复制进个人菜单（个人菜单可自由增删改）
 */
export const BUILTIN_DISHES = [...DEFAULT_DISHES, ...BUILTIN_NEW_DISHES];

// 默认用户资料
export const DEFAULT_USER = {
  nickname: '今天吃什么呀',
  avatar: '🦊',
  kitchenName: '我家小厨',
};
