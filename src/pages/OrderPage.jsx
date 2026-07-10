import React from 'react';
import { useApp } from '../App';
import DishCard from '../components/DishCard';

export default function OrderPage() {
  const { dishes, activeCategory, setActiveCategory, CATEGORIES } = useApp();

  const filteredDishes =
    activeCategory === '全部'
      ? dishes
      : dishes.filter((d) => d.categories && d.categories.includes(activeCategory));

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Category Navigation */}
      <div className="flex gap-2 overflow-x-auto px-5 pt-3 pb-2 flex-shrink-0 hide-scrollbar">
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
