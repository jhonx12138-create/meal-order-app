/**
 * localStorage 数据读写层
 * Data persistence layer using localStorage
 */

import { DEFAULT_DISHES, DEFAULT_USER } from './defaults';

const STORAGE_KEYS = {
  dishes: 'meal_app_dishes',
  cart: 'meal_app_cart',
  meals: 'meal_app_meals',
  orders: 'meal_app_orders',
  user: 'meal_app_user',
  banner: 'meal_app_banner',
  initialized: 'meal_app_initialized',
  dataVersion: 'meal_app_data_version',
};

// 数据版本号：默认菜谱结构变更时 +1，触发老用户数据重置
const DATA_VERSION = '7';

function resetToDefaults() {
  saveDishes(DEFAULT_DISHES);
  saveCart({});
  saveMeals([]);
  saveOrders([]);
  saveUser(DEFAULT_USER);
  localStorage.setItem(STORAGE_KEYS.initialized, 'true');
  localStorage.setItem(STORAGE_KEYS.dataVersion, DATA_VERSION);
}

/**
 * 初始化数据：首次使用或数据版本升级时写入预置数据
 */
export function initializeData() {
  const isInitialized = localStorage.getItem(STORAGE_KEYS.initialized);
  const savedVersion = localStorage.getItem(STORAGE_KEYS.dataVersion);

  if (!isInitialized || savedVersion !== DATA_VERSION) {
    resetToDefaults();
    return {
      dishes: DEFAULT_DISHES,
      cart: {},
      meals: [],
      orders: [],
      user: DEFAULT_USER,
      banner: loadBanner(),
    };
  }
  return {
    dishes: loadDishes(),
    cart: loadCart(),
    meals: loadMeals(),
    orders: loadOrders(),
    user: loadUser(),
    banner: loadBanner(),
  };
}

/** 菜品 (Dishes) */
export function loadDishes() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.dishes);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveDishes(dishes) {
  localStorage.setItem(STORAGE_KEYS.dishes, JSON.stringify(dishes));
}

/** 点菜清单 (Cart) */
export function loadCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.cart);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
}

/** 食记 (Meals) */
export function loadMeals() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.meals);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveMeals(meals) {
  localStorage.setItem(STORAGE_KEYS.meals, JSON.stringify(meals));
}

/** 历史订单 (Orders) */
export function loadOrders() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.orders);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
}

/** 用户资料 (User) */
export function loadUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.user);
    return data || DEFAULT_USER;
  } catch {
    return DEFAULT_USER;
  }
}

export function saveUser(user) {
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

/** 头图 (Banner) */
export function loadBanner() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.banner);
    return data || null;
  } catch {
    return null;
  }
}

export function saveBanner(banner) {
  localStorage.setItem(STORAGE_KEYS.banner, banner);
}

/** 重置所有数据（调试用） */
export function resetAllData() {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
}
