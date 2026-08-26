import React from 'react';
import { useApp } from '../App';

/**
 * 食记时间线组件
 * 按日期倒序展示食记，时间线样式（左侧圆点+竖线）
 */
export default function MealList({ meals, emptyIcon = '📖', emptyText = '还没有食记，点菜下单后保存到这里' }) {
  const { deleteMeal } = useApp();

  if (!meals || meals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
        <div className="text-[64px] mb-3">{emptyIcon}</div>
        <div className="text-sm text-brown-light">{emptyText}</div>
      </div>
    );
  }

  // 按日期倒序
  const sorted = [...meals].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return (
    <div className="relative pl-7">
      {/* 时间轴竖线 */}
      <div className="absolute left-[8px] top-3 bottom-3 w-[2px] bg-[#F0E6DA]" />
      {sorted.map((meal) => (
        <div key={meal.id} className="relative mb-5">
          {/* 时间轴圆点 */}
          <div className="absolute -left-[27px] top-3 w-3.5 h-3.5 rounded-full border-2 border-[#E88D5A] bg-white" />
          <div className="bg-white rounded-card p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-muted">{meal.date}</div>
              <button
                onClick={() => deleteMeal(meal.id)}
                className="text-xs text-muted bg-transparent border-none cursor-pointer"
              >
                删除
              </button>
            </div>

            {/* 照片 */}
            {meal.photo && (
              <img
                src={meal.photo}
                alt="食记照片"
                className="w-full h-40 object-cover rounded-lg mb-2.5"
              />
            )}

            {/* 评分 */}
            {meal.rating > 0 && (
              <div className="text-[15px] mb-1.5 leading-none" style={{ color: '#E88D5A' }}>
                {'★'.repeat(meal.rating)}
                <span style={{ color: '#D9CFC3' }}>{'★'.repeat(5 - meal.rating)}</span>
              </div>
            )}

            {/* 菜名 */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {(meal.menu || []).map((dishName, idx) => (
                <span key={idx} className="px-3 py-1 rounded-[10px] text-xs text-brown bg-cream">
                  {dishName}
                </span>
              ))}
            </div>

            {/* 点评 */}
            {meal.comment && (
              <div className="text-sm text-brown mt-1">「{meal.comment}」</div>
            )}

            {/* 和谁吃 */}
            {meal.who && <div className="text-[11px] text-muted mt-1">👨‍👩‍👧 {meal.who}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
