import React from 'react';
import { useApp } from '../App';
import DishCard from '../components/DishCard';

/**
 * 点菜页面
 * Order page with category navigation, search bar, and dish grid
 */
export default function OrderPage() {
  const { dishes, activeCategory, setActiveCategory, setSearchOpen, CATEGORIES } = useApp();

  // Filter dishes by active category
  const filteredDishes =
    activeCategory === '全部'
      ? dishes
      : dishes.filter((d) => d.categories && d.categories.includes(activeCategory));

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Search Bar */}
      <div className="px-5 mb-3 flex-shrink-0">
        <div
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 bg-cream rounded-btn px-4 py-2 cursor-pointer"
        >
          <span className="text-base text-muted">🔍</span>
          <span className="text-sm text-muted flex-1">搜搜你家的菜谱…</span>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-2 flex-shrink-0 hide-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3.5 py-1.5 rounded-tag text-[13px] whitespace-nowrap cursor-pointer border-none flex-shrink-0 transition-colors duration-200"
            style={{
              background: activeCategory === cat ? '#E88D5A' : '#F5ECE1',
              color: activeCategory === cat ? '#fff' : '#8B7355',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dish Grid / Empty State */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 hide-scrollbar">
        {filteredDishes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
            <div className="text-[64px] mb-3">🍽️</div>
            <div className="text-sm text-brown-light mb-4">
              {activeCategory === '全部'
                ? '还没有菜谱，去厨房添加一道吧'
                : `"${activeCategory}"分类下还没有菜谱`}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
