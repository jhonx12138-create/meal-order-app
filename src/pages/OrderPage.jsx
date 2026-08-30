import React from 'react';
import { useApp } from '../App';
import DishCard from '../components/DishCard';

export default function OrderPage() {
  const { dishes, activeCategory, setActiveCategory, CATEGORIES, goToKitchen } = useApp();

  const isAll = activeCategory === '全部';

  // 菜品统一按上传时间倒序排序
  const sortedDishes = [...dishes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // 展示用分类顺序（排除「全部」）
  const orderedCategories = CATEGORIES.filter((cat) => cat !== '全部');

  // 生成展示区块：全部时按分类顺序分组（空分类不渲染）；单分类时仅该分类
  const sections = isAll
    ? orderedCategories
        .map((cat) => ({
          cat,
          items: sortedDishes.filter(
            (d) => d.categories && d.categories.includes(cat)
          ),
        }))
        .filter((section) => section.items.length > 0)
    : [
        {
          cat: activeCategory,
          items: sortedDishes.filter(
            (d) => d.categories && d.categories.includes(activeCategory)
          ),
        },
      ];

  const isEmpty = isAll ? dishes.length === 0 : sections[0].items.length === 0;

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* 左侧分类边栏 */}
      <div className="w-[92px] flex-shrink-0 overflow-y-auto bg-cream/30 border-r border-cream hide-scrollbar">
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
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
            <div className="text-[64px] mb-3">🍽️</div>
            <div className="text-sm text-brown-light mb-4">
              {isAll
                ? '还没有菜品，去【菜谱】栏添加一道吧'
                : `「${activeCategory}」分类下还没有菜品`}
            </div>
            <button
              onClick={() => goToKitchen(activeCategory)}
              className="px-5 py-2.5 rounded-btn text-sm font-semibold text-white cursor-pointer border-none"
              style={{ background: '#E88D5A' }}
            >
              去【菜谱】添加 / 管理
            </button>
          </div>
        ) : (
          sections.map((section) => (
            <div key={section.cat} className="mb-4">
              {isAll && (
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="text-[13px] font-semibold text-brown whitespace-nowrap">
                    {section.cat}
                  </span>
                  <span className="flex-1 h-px bg-[#E8DCCB]" />
                  <span className="text-[11px] text-muted whitespace-nowrap">
                    {section.items.length} 道菜
                  </span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                {section.items.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
