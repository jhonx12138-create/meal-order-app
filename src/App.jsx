import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  initializeData,
  saveDishes,
  saveCart,
  saveMeals,
  saveOrders,
  saveUser,
  saveBanner,
  resolveBanner,
  DEFAULT_BANNER_ID,
} from './data/store';
import { CATEGORIES, CAT_FOODS, DEFAULT_USER, BUILTIN_DISHES } from './data/defaults';
import TabBar from './components/TabBar';
import OrderPage from './pages/OrderPage';
import MealPage from './pages/MealPage';
import KitchenPage from './pages/KitchenPage';
import ProfilePage from './pages/ProfilePage';
import CartFloat from './components/CartFloat';
import CartDrawer from './components/CartDrawer';
import PurchaseSheet from './components/PurchaseSheet';
import ShareImageSheet from './components/ShareImageSheet';
import MealForm from './components/MealForm';
import { generateShareImage } from './utils/shareImage';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import SearchPage from './components/SearchPage';
import Toast from './components/Toast';

// ─── MUI Theme ────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    primary: { main: '#E88D5A' },
    secondary: { main: '#7BC67E' },
    background: { default: '#FFFAF5' },
    text: { primary: '#4A3728', secondary: '#8B7355' },
  },
  typography: {
    fontFamily: '-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif',
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
        },
      },
    },
  },
});

// ─── App Context ──────────────────────────────────────────────
const AppContext = createContext(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// ─── Constants ───────────────────────────────────────────────
const TABS = {
  ORDER: 'order',
  MEAL: 'meal',
  KITCHEN: 'kitchen',
  PROFILE: 'profile',
};

const TAB_TITLES = {
  [TABS.ORDER]: '我家小厨',
  [TABS.MEAL]: '订单',
  [TABS.KITCHEN]: '菜谱',
  [TABS.PROFILE]: '我的',
};

// ─── Ingredient Categorization ───────────────────────────────
function categorizeIngredient(name) {
  for (const [cat, foods] of Object.entries(CAT_FOODS)) {
    if (foods.some((f) => name.includes(f))) {
      if (cat === '肉肉') return '肉类';
      if (cat === '菜菜') return '蔬菜';
      if (cat === '主食' || cat === '面面' || cat === '早餐') return '主食';
      if (cat === '果果' || cat === '甜甜') return '水果 / 零食';
      if (cat === '小药') return '其他';
    }
  }
  const seasoningKeywords = ['油', '醋', '酱', '盐', '糖', '生抽', '老抽', '料酒', '蒜', '姜', '葱', '辣椒', '花椒', '八角', '桂皮', '味精', '鸡精', '蚝油', '番茄酱', '豆瓣酱', '胡椒粉', '五香粉', '咖喱', '底料'];
  if (seasoningKeywords.some((k) => name.includes(k))) return '调味料';
  return '其他';
}

// 采购清单分组展示顺序：肉类、蔬菜、主食优先，调味料放最后
const CATEGORY_ORDER = ['肉类', '蔬菜', '主食', '水果 / 零食', '其他', '调味料'];

// ─── App Component ───────────────────────────────────────────
export default function App() {
  // ─── State ──────────────────────────────────────────────────
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState({});
  const [meals, setMeals] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(DEFAULT_USER);
  const [banner, setBanner] = useState(`builtin:${DEFAULT_BANNER_ID}`);
  const [activeTab, setActiveTab] = useState(TABS.ORDER);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [toastMsg, setToastMsg] = useState('');

  // Overlay states
  const [cartOpen, setCartOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [purchaseData, setPurchaseData] = useState(null);
  const [recipeFormOpen, setRecipeFormOpen] = useState(false);
  const [shareImage, setShareImage] = useState(null);
  const [shareImageOpen, setShareImageOpen] = useState(false);
  const [shareOrderData, setShareOrderData] = useState(null);
  const [mealFormOpen, setMealFormOpen] = useState(false);
  const [mealFormOrder, setMealFormOrder] = useState(null);
  const [editingDish, setEditingDish] = useState(null);
  const [recipeDetailOpen, setRecipeDetailOpen] = useState(false);
  const [detailDish, setDetailDish] = useState(null);
  // 详情只读标记：内置菜单等来源禁止编辑/删除
  const [detailReadonly, setDetailReadonly] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // ─── Init ───────────────────────────────────────────────────
  useEffect(() => {
    const data = initializeData();
    setDishes(data.dishes);
    setCart(data.cart);
    setMeals(data.meals);
    setOrders(data.orders);
    setUser(data.user);
    // 未设置过头图时使用默认内置头图
    setBanner(data.banner || `builtin:${DEFAULT_BANNER_ID}`);
  }, []);

  // ─── Persistence ────────────────────────────────────────────
  const dataReady = useRef(false);
  useEffect(() => {
    if (dataReady.current) {
      saveDishes(dishes);
    } else {
      dataReady.current = true;
    }
  }, [dishes]);
  useEffect(() => { saveCart(cart); }, [cart]);
  useEffect(() => { saveMeals(meals); }, [meals]);
  useEffect(() => { saveOrders(orders); }, [orders]);
  useEffect(() => { saveUser(user); }, [user]);
  useEffect(() => { if (banner) saveBanner(banner); }, [banner]);

  // ─── Toast ──────────────────────────────────────────────────
  const toastTimer = useRef(null);
  const showToast = useCallback((msg) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    toastTimer.current = setTimeout(() => setToastMsg(''), 1500);
  }, []);

  // ─── Cart Operations ────────────────────────────────────────
  const toggleCartItem = useCallback(
    (dishId) => {
      setCart((prev) => {
        const next = { ...prev };
        if (next[dishId]) {
          delete next[dishId];
        } else {
          next[dishId] = 1;
        }
        return next;
      });
      const inCart = cart[dishId];
      showToast(inCart ? '已移出清单' : '已加入点菜清单');
    },
    [cart, showToast]
  );

  const changeCartQty = useCallback(
    (dishId, delta) => {
      setCart((prev) => {
        const next = { ...prev };
        const newQty = (next[dishId] || 1) + delta;
        if (newQty <= 0) {
          delete next[dishId];
        } else {
          next[dishId] = Math.min(newQty, 20);
        }
        return next;
      });
    },
    []
  );

  const removeCartItem = useCallback((dishId) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[dishId];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({});
    setCartOpen(false);
    showToast('已清空清单');
  }, [showToast]);

  const cartCount = Object.keys(cart).length;
  const cartItems = Object.keys(cart)
    .map((id) => {
      const dish = dishes.find((d) => d.id === id);
      return dish ? { ...dish, qty: cart[id] } : null;
    })
    .filter(Boolean);

  // ─── Dish CRUD ──────────────────────────────────────────────
  const addDish = useCallback(
    (dishData) => {
      const newDish = {
        id: 'd' + Date.now(),
        ...dishData,
        createdAt: new Date().toISOString(),
      };
      setDishes((prev) => [newDish, ...prev]);
      showToast('菜谱已添加');
    },
    [showToast]
  );

  const updateDish = useCallback(
    (dishId, dishData) => {
      setDishes((prev) =>
        prev.map((d) => (d.id === dishId ? { ...d, ...dishData } : d))
      );
      showToast('菜谱已更新');
    },
    [showToast]
  );

  const deleteDish = useCallback(
    (dishId) => {
      setDishes((prev) => prev.filter((d) => d.id !== dishId));
      setCart((prev) => {
        const next = { ...prev };
        delete next[dishId];
        return next;
      });
      showToast('已删除');
    },
    [showToast]
  );

  // ─── Recipe Form ────────────────────────────────────────────
  const openAddRecipe = useCallback(() => {
    setEditingDish(null);
    setRecipeFormOpen(true);
  }, []);

  const openEditRecipe = useCallback((dish) => {
    setEditingDish(dish);
    setRecipeFormOpen(true);
  }, []);

  const handleRecipeSave = useCallback(
    (dishData) => {
      if (editingDish) {
        updateDish(editingDish.id, dishData);
      } else {
        addDish(dishData);
      }
      setRecipeFormOpen(false);
      setEditingDish(null);
    },
    [editingDish, addDish, updateDish]
  );

  // ─── Recipe Detail ──────────────────────────────────────────
  const openRecipeDetail = useCallback((dish, readonly = false) => {
    setDetailDish(dish);
    setDetailReadonly(!!readonly);
    setRecipeDetailOpen(true);
  }, []);

  const handleDetailEdit = useCallback(() => {
    if (detailDish) {
      setRecipeDetailOpen(false);
      openEditRecipe(detailDish);
    }
  }, [detailDish, openEditRecipe]);

  const handleDetailDelete = useCallback(() => {
    if (detailDish && window.confirm('确定要删除这个菜谱吗？')) {
      deleteDish(detailDish.id);
      setRecipeDetailOpen(false);
      setDetailDish(null);
      setDetailReadonly(false);
    }
  }, [detailDish, deleteDish]);

  // ─── Builtin Menu ──────────────────────────────────────────
  // 从内置菜单挑选菜品 → 复制进个人菜单（生成新 id，不污染内置菜单）
  const addBuiltinToPersonal = useCallback(
    (builtinDish) => {
      const { id, createdAt, ...rest } = builtinDish;
      const newDish = {
        id: 'd' + Date.now(),
        ...rest,
        createdAt: new Date().toISOString(),
      };
      setDishes((prev) => [newDish, ...prev]);
      showToast('已加入个人菜单');
    },
    [showToast]
  );

  // ─── Checkout ───────────────────────────────────────────────
  const checkout = useCallback(() => {
    const itemIds = Object.keys(cart);
    if (itemIds.length === 0) {
      showToast('先选几道菜吧');
      return;
    }

    const ingredientMap = {};
    const menuNames = [];

    itemIds.forEach((id) => {
      const d = dishes.find((dd) => dd.id === id);
      if (!d) return;
      menuNames.push(d.name);
      d.ingredients.forEach((ing) => {
        const key = ing.name;
        if (!ingredientMap[key]) {
          ingredientMap[key] = { amount: ing.amount, dishes: [d.name] };
        } else {
          if (!ingredientMap[key].dishes.includes(d.name)) {
            ingredientMap[key].dishes.push(d.name);
          }
        }
      });
    });

    const groups = {};
    Object.entries(ingredientMap).forEach(([name, info]) => {
      const cat = categorizeIngredient(name);
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push({ name, amount: info.amount, dishes: info.dishes, checked: false });
    });

    // 按优先级排序分组：肉类/蔬菜/主食优先，调味料最后
    const sortedGroups = {};
    CATEGORY_ORDER.forEach((cat) => {
      if (groups[cat]) sortedGroups[cat] = groups[cat];
    });
    Object.keys(groups).forEach((cat) => {
      if (!CATEGORY_ORDER.includes(cat)) sortedGroups[cat] = groups[cat];
    });

    const orderId = 'o' + Date.now();
    const order = {
      id: orderId,
      date: new Date().toISOString().slice(0, 10),
      menu: [...menuNames],
      groups: sortedGroups,
      status: 'pending',
    };

    setOrders((prev) => [order, ...prev]);
    setCart({});

    setPurchaseData(order);
    setCartOpen(false);
    setPurchaseOpen(true);
  }, [cart, dishes, showToast]);

  // ─── Purchase: toggle check ─────────────────────────────────
  const togglePurchaseCheck = useCallback(
    (orderId, catName, ingIdx) => {
      setPurchaseData((prev) => {
        if (!prev || prev.id !== orderId) return prev;
        return {
          ...prev,
          groups: {
            ...prev.groups,
            [catName]: prev.groups[catName].map((item, i) =>
              i === ingIdx ? { ...item, checked: !item.checked } : item
            ),
          },
        };
      });
      setOrders((prev) =>
        prev.map((o) => {
          if (o.id !== orderId || !o.groups || !o.groups[catName]) return o;
          const newGroups = {
            ...o.groups,
            [catName]: o.groups[catName].map((item, i) =>
              i === ingIdx ? { ...item, checked: !item.checked } : item
            ),
          };
          // 状态流转（调味料常备不参与统计）：全勾选=已完成，部分=采购中，未勾=待采购
          const items = Object.entries(newGroups)
            .filter(([c]) => c !== '调味料')
            .flatMap(([, arr]) => arr);
          const done = items.filter((i) => i.checked).length;
          let status = 'pending';
          if (items.length > 0 && done === items.length) status = 'done';
          else if (done > 0) status = 'purchasing';
          return { ...o, groups: newGroups, status };
        })
      );
    },
    []
  );

  // ─── Purchase: share ────────────────────────────────────────
  const shareOrder = useCallback(
    (orderId) => {
      const order = orders.find((o) => o.id === orderId) || purchaseData;
      if (!order) return;

      generateShareImage(order, resolveBanner(banner)).then((dataURL) => {
        setShareImage(dataURL);
        setShareOrderData(order);
        setShareImageOpen(true);
      });
    },
    [orders, purchaseData, banner]
  );

  // ─── Meal Form (save order as meal) ─────────────────────────
  const openMealForm = useCallback(
    (orderId) => {
      const order = orders.find((o) => o.id === orderId) || purchaseData;
      if (!order) return;
      setMealFormOrder(order);
      setMealFormOpen(true);
    },
    [orders, purchaseData]
  );

  const handleMealSave = useCallback(
    (mealData) => {
      const order = mealFormOrder;
      if (!order) return;
      setMeals((prev) => [
        {
          id: 'm' + Date.now(),
          orderId: order.id,
          date: order.date,
          menu: order.menu,
          ingredientGroups: order.groups,
          status: 'purchased',
          rating: mealData.rating || 0,
          comment: mealData.comment || '',
          who: mealData.who || '',
          photo: mealData.photo || null,
        },
        ...prev,
      ]);
      // 标记对应订单已记入食记
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, mealSaved: true } : o))
      );
      setMealFormOpen(false);
      setMealFormOrder(null);
      showToast('已记入食记');
    },
    [mealFormOrder, showToast]
  );

  // ─── Order Operations ───────────────────────────────────────
  const deleteOrder = useCallback(
    (orderId) => {
      if (window.confirm('确定要删除这条订单吗？')) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
        showToast('已删除');
      }
    },
    [showToast]
  );

  const reuseOrder = useCallback(
    (orderId) => {
      const order = orders.find((o) => o.id === orderId);
      if (!order) return;
      setCart((prev) => {
        const next = { ...prev };
        order.menu.forEach((name) => {
          const dish = dishes.find((d) => d.name === name);
          if (dish && !next[dish.id]) next[dish.id] = 1;
        });
        return next;
      });
      setActiveTab(TABS.ORDER);
      showToast('已加入点菜清单');
    },
    [orders, dishes, showToast]
  );

  // ─── Meal Operations ────────────────────────────────────────
  const deleteMeal = useCallback(
    (mealId) => {
      if (window.confirm('确定要删除这条食记吗？')) {
        setMeals((prev) => prev.filter((m) => m.id !== mealId));
        showToast('已删除');
      }
    },
    [showToast]
  );

  // ─── User Operations ────────────────────────────────────────
  const updateUser = useCallback(
    (userData) => {
      setUser((prev) => ({ ...prev, ...userData }));
      showToast('保存成功');
    },
    [showToast]
  );

  const updateBanner = useCallback(
    (bannerData) => {
      setBanner(bannerData);
      showToast('头图已更新');
    },
    [showToast]
  );

  // ─── Search Results ─────────────────────────────────────────
  const searchDishes = useCallback(
    (query) => {
      if (!query.trim()) return [];
      const q = query.trim();
      return dishes.filter(
        (d) =>
          d.name.includes(q) ||
          d.ingredients.some((i) => i.name.includes(q))
      );
    },
    [dishes]
  );

  // ─── Context Value ──────────────────────────────────────────
  const ctx = {
    // Data
    dishes,
    cart,
    meals,
    orders,
    user,
    banner,
    activeTab,
    activeCategory,
    // Constants
    TABS,
    TAB_TITLES,
    CATEGORIES,
    BUILTIN_DISHES,
    // Derived
    cartCount,
    cartItems,
    // Actions
    setActiveTab,
    setActiveCategory,
    showToast,
    // Cart
    toggleCartItem,
    changeCartQty,
    removeCartItem,
    clearCart,
    checkout,
    // Dish CRUD
    addDish,
    updateDish,
    deleteDish,
    // Overlay controls
    cartOpen,
    setCartOpen,
    purchaseOpen,
    setPurchaseOpen,
    purchaseData,
    togglePurchaseCheck,
    shareOrder,
    shareImage,
    shareImageOpen,
    setShareImageOpen,
    shareOrderData,
    mealFormOpen,
    setMealFormOpen,
    openMealForm,
    handleMealSave,
    deleteOrder,
    reuseOrder,
    // Recipe form
    recipeFormOpen,
    setRecipeFormOpen,
    editingDish,
    openAddRecipe,
    openEditRecipe,
    handleRecipeSave,
    // Recipe detail
    recipeDetailOpen,
    setRecipeDetailOpen,
    detailDish,
    detailReadonly,
    openRecipeDetail,
    handleDetailEdit,
    handleDetailDelete,
    // Builtin menu
    addBuiltinToPersonal,
    // Search
    searchOpen,
    setSearchOpen,
    searchDishes,
    // Meals
    deleteMeal,
    // User
    updateUser,
    updateBanner,
  };

  // ─── Render ─────────────────────────────────────────────────
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider value={ctx}>
        <div className="app-container">
          {/* Header — with banner background on order page */}
          <header
            className="flex items-center justify-between px-5 py-4 flex-shrink-0 relative"
            style={
              activeTab === TABS.ORDER && resolveBanner(banner)
                ? {
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.35)), url(${resolveBanner(banner)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    marginBottom: '16px',
                  }
                : {}
            }
          >
            {/* 点菜页标题 = 厨房名称（超4字换行），其余页用固定标题 */}
            {activeTab === TABS.ORDER ? (
              <h1
                className="m-0 flex flex-col justify-center"
                style={{
                  color: '#fff',
                  textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  lineHeight: 1.25,
                }}
              >
                {(() => {
                  const name = (user.kitchenName || '我家小厨').trim();
                  if (name.length > 4) {
                    return (
                      <span className="text-[22px] font-bold leading-snug text-center">
                        {name.slice(0, 4)}
                        <br />
                        {name.slice(4)}
                      </span>
                    );
                  }
                  return <span className="text-xl font-bold">{name}</span>;
                })()}
              </h1>
            ) : (
              <h1
                className="text-xl font-bold m-0"
                style={{ color: '#4A3728' }}
              >
                {TAB_TITLES[activeTab]}
              </h1>
            )}
            <div className="text-sm text-coral px-2 py-1 rounded-lg" />
          </header>

          {/* Content */}
          <main className="flex-1 overflow-hidden flex flex-col">
            {activeTab === TABS.ORDER && <OrderPage />}
            {activeTab === TABS.MEAL && <MealPage />}
            {activeTab === TABS.KITCHEN && <KitchenPage />}
            {activeTab === TABS.PROFILE && <ProfilePage />}
          </main>

          {/* Bottom Tab Bar */}
          <TabBar />

          {/* Floating Cart Button - only on order page */}
          {activeTab === TABS.ORDER && <CartFloat />}

          {/* Overlays / Dialogs */}
          <CartDrawer />
          <PurchaseSheet />
          <ShareImageSheet />
          <MealForm />
          <RecipeForm onSave={handleRecipeSave} />
          <RecipeDetail />
          <SearchPage />

          {/* Toast */}
          <Toast message={toastMsg} />
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}
