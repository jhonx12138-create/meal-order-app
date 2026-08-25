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
    <div className="flex flex-1 overflow-hidden">
      {/* 左侧分类边栏 */}
      <div className="w-[76px] flex-shrink-0 overflow-y-auto bg-cream/30 border-r border-cream hide-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="w-full py-3.5 px-1 text-[12px] text-center cursor-pointer border-none transition-colors duration-200"
              style={{
                background: isActive ? '#fff' : 'transparent',
                color: isActive ? '#E88D5A' : '#8B7355',
                fontWeight: isActive ? 600 : 400,
                borderLeft: isActive ? '3px solid #E88D5A' : '3px solid transparent',
                lineHeight: 1.3,
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 右侧菜品区 */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 hide-scrollbar">
        {filteredDishes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
            <div className="text-[64px] mb-3">🍽️</div>
            <div className="text-sm text-brown-light mb-4">
              {activeCategory === '全部'
                ? '还没有菜谱，去菜谱添加一道吧'
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
