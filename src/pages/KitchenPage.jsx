import React, { useState } from 'react';
import { useApp } from '../App';

/**
 * 菜谱页面
 * Kitchen page showing recipes grouped by category with add button
 */
export default function KitchenPage() {
  const { dishes, openAddRecipe, openRecipeDetail, CATEGORIES } = useApp();
  const [activeCat, setActiveCat] = useState('全部');

  const cats = CATEGORIES.filter((c) => c !== '全部');
  const filtered =
    activeCat === '全部'
      ? dishes
      : dishes.filter((d) => d.categories && d.categories.includes(activeCat));

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Category Tags */}
      <div className="px-5 mb-3 flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {['全部', ...cats].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className="px-3.5 py-1.5 rounded-tag text-[13px] cursor-pointer border-none whitespace-nowrap transition-colors"
              style={{
                background: activeCat === cat ? '#E88D5A' : '#F5ECE1',
                color: activeCat === cat ? '#fff' : '#8B7355',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe List */}
      <div className="flex-1 overflow-y-auto px-5 hide-scrollbar">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
            <div className="text-[64px] mb-3">🍽️</div>
            <div className="text-sm text-brown-light mb-4">
              {activeCat === '全部'
                ? '还没有菜谱，添加一道吧'
                : `「${activeCat}」分类下还没有菜谱`}
            </div>
          </div>
        ) : (
          filtered.map((dish) => (
            <div
              key={dish.id}
              onClick={() => openRecipeDetail(dish)}
              className="flex items-center p-3 bg-white rounded-card mb-2 gap-3 shadow-[0_1px_4px_rgba(0,0,0,0.03)] cursor-pointer active:bg-[#faf7f2]"
            >
              <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-4xl bg-cream flex-shrink-0 overflow-hidden">
                {dish.photo ? (
                  <img src={dish.photo} alt={dish.name} className="w-full h-full object-cover" />
                ) : (
                  dish.emoji || '🍽️'
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-brown mb-0.5">{dish.name}</div>
                <div className="text-[11px] text-muted">
                  {(dish.categories || []).join(' · ') || '未分类'}
                </div>
              </div>
              <span className="text-sm text-muted">›</span>
            </div>
          ))
        )}
      </div>

      {/* Add Button */}
      <div className="px-5 pb-3 flex-shrink-0 safe-bottom">
        <button
          onClick={openAddRecipe}
          className="w-full py-3.5 rounded-btn text-white text-[15px] font-semibold cursor-pointer border-none"
          style={{ background: '#E88D5A' }}
        >
          + 添加菜谱
        </button>
      </div>
    </div>
  );
}
