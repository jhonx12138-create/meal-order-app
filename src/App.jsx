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
} from './data/store';
import { CATEGORIES, CAT_FOODS, DEFAULT_USER } from './data/defaults';
import TabBar from './components/TabBar';
import OrderPage from './pages/OrderPage';
import MealPage from './pages/MealPage';
import KitchenPage from './pages/KitchenPage';
import ProfilePage from './pages/ProfilePage';
import CartFloat from './components/CartFloat';
import CartDrawer from './components/CartDrawer';
import PurchaseSheet from './components/PurchaseSheet';
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
  [TABS.ORDER]: '点菜',
  [TABS.MEAL]: '食记',
  [TABS.KITCHEN]: '厨房',
  [TABS.PROFILE]: '我的',
};

// ─── Ingredient Categorization ───────────────────────────────
function categorizeIngredient(name) {
  for (const [cat, foods] of Object.entries(CAT_FOODS)) {
    if (foods.some((f) => name.includes(f))) {
      if (cat === '肉肉' || cat === '早餐' || cat === '面面') return '肉类 / 主食';
      if (cat === '菜菜') return '蔬菜';
      if (cat === '果果' || cat === '甜甜') return '水果 / 零食';
      if (cat === '小药') return '其他';
    }
  }
  const seasoningKeywords = ['油', '醋', '酱', '盐', '糖', '生抽', '老抽', '料酒', '蒜', '姜', '葱', '辣椒', '花椒', '八角', '桂皮', '味精', '鸡精', '蚝油', '番茄酱', '豆瓣酱', '胡椒粉', '五香粉'];
  if (seasoningKeywords.some((k) => name.includes(k))) return '调味料';
  return '其他';
}

// ─── App Component ───────────────────────────────────────────
export default function App() {
  // ─── State ──────────────────────────────────────────────────
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState({});
  const [meals, setMeals] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(DEFAULT_USER);
  const [banner, setBanner] = useState(null);
  const [activeTab, setActiveTab] = useState(TABS.ORDER);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [toastMsg, setToastMsg] = useState('');

  // Overlay states
  const [cartOpen, setCartOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [purchaseData, setPurchaseData] = useState(null);
  const [recipeFormOpen, setRecipeFormOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [recipeDetailOpen, setRecipeDetailOpen] = useState(false);
  const [detailDish, setDetailDish] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // ─── Init ───────────────────────────────────────────────────
  useEffect(() => {
    const data = initializeData();
    setDishes(data.dishes);
    setCart(data.cart);
    setMeals(data.meals);
    setOrders(data.orders);
    setUser(data.user);
    setBanner(data.banner);
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
  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 1500);
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
  const openRecipeDetail = useCallback((dish) => {
    setDetailDish(dish);
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
    }
  }, [detailDish, deleteDish]);

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

    const orderId = 'o' + Date.now();
    const order = {
      id: orderId,
      date: new Date().toISOString().slice(0, 10),
      menu: [...menuNames],
      groups,
    };

    setOrders((prev) => [order, ...prev]);

    setPurchaseData(order);
    setCartOpen(false);
    setPurchaseOpen(true);
  }, [cart, dishes, showToast]);

  // ─── Purchase: toggle check ─────────────────────────────────
  const togglePurchaseCheck = useCallback(
    (orderId, catName, ingIdx) => {
      setPurchaseData((prev) => {
        if (!prev || prev.id !== orderId) return prev;
        const next = { ...prev, groups: { ...prev.groups } };
        next.groups = { ...next.groups };
        next.groups[catName] = next.groups[catName].map((item, i) =>
          i === ingIdx ? { ...item, checked: !item.checked } : item
        );
        return next;
      });
    },
    []
  );

  // ─── Purchase: share ────────────────────────────────────────
  const shareOrder = useCallback(
    (orderId) => {
      const order = orders.find((o) => o.id === orderId) || purchaseData;
      if (!order) return;

      let text = `今日菜单：\n${order.menu.map((m) => '  · ' + m).join('\n')}\n\n采购清单：\n`;
      Object.entries(order.groups).forEach(([cat, items]) => {
        text += `【${cat}】\n`;
        items.forEach((item) => {
          text += `  ${item.checked ? '✓' : '□'} ${item.name} ${item.amount}\n`;
        });
      });
      text += '\n来自「今天吃什么」APP';

      if (navigator.share) {
        navigator.share({ title: '今日菜单', text }).catch(() => {});
      } else {
        navigator.clipboard.writeText(text).then(() => showToast('已复制到剪贴板'));
      }
    },
    [orders, purchaseData, showToast]
  );

  // ─── Purchase: save to meals ────────────────────────────────
  const saveOrderToMeals = useCallback(
    (orderId) => {
      const order = orders.find((o) => o.id === orderId) || purchaseData;
      if (!order) return;

      setMeals((prev) => [
        {
          id: 'm' + Date.now(),
          date: order.date,
          menu: order.menu,
          ingredientGroups: order.groups,
          status: 'purchased',
        },
        ...prev,
      ]);

      setCart({});
      setPurchaseOpen(false);
      setPurchaseData(null);
      showToast('已保存到食记');
    },
    [orders, purchaseData, showToast]
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
    saveOrderToMeals,
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
    openRecipeDetail,
    handleDetailEdit,
    handleDetailDelete,
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
              activeTab === TABS.ORDER && banner
                ? {
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.35)), url(${banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                  }
                : {}
            }
          >
            <h1
              className="text-xl font-bold m-0"
              style={{
                color: activeTab === TABS.ORDER && banner ? '#fff' : '#4A3728',
                textShadow: activeTab === TABS.ORDER && banner ? '0 1px 4px rgba(0,0,0,0.4)' : 'none',
              }}
            >
              {TAB_TITLES[activeTab]}
            </h1>
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
