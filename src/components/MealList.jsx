import React from 'react';
import { useApp } from '../App';

/**
 * 食记列表组件
 * Meal history list display
 */
export default function MealList({ meals, showDelete = true, emptyIcon = '📄', emptyText = '还没有食记，点菜下单后保存到这里' }) {
  const { deleteMeal } = useApp();

  if (meals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
        <div className="text-[64px] mb-3">{emptyIcon}</div>
        <div className="text-sm text-brown-light">{emptyText}</div>
      </div>
    );
  }

  return (
    <div>
      {meals.map((meal) => (
        <div
          key={meal.id}
          className="bg-white rounded-card p-4 mb-3 shadow-[0_1px_4px_rgba(0,0,0,0.03)] relative group"
        >
          <div className="text-xs text-muted mb-2">{meal.date}</div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {meal.menu.map((dishName, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-[10px] text-xs text-brown bg-cream"
              >
                {dishName}
              </span>
            ))}
          </div>
          <div className="text-[11px] text-green">
            {meal.status === 'purchased' ? '食材已采购 ✓' : meal.status}
          </div>
          {showDelete && (
            <button
              onClick={() => deleteMeal(meal.id)}
              className="absolute top-4 right-4 text-xs text-muted bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            >
              删除
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
