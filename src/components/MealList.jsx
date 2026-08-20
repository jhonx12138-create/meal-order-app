import React, { useState } from 'react';
import { useApp } from '../App';

/**
 * 食记列表组件
 * Meal history list display.
 * 同时支持历史订单（含 groups 字段）的展开查看采购清单与重新分享。
 */
export default function MealList({ meals, showDelete = true, emptyIcon = '📄', emptyText = '还没有食记，点菜下单后保存到这里', onShare = null }) {
  const { deleteMeal } = useApp();
  const [expandedId, setExpandedId] = useState(null);

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
      {meals.map((meal) => {
        // 食记(meals)与历史订单(orders)结构不同，只有订单含 groups 字段，才支持展开
        const isOrder = !!(meal.groups && typeof meal.groups === 'object');
        const expanded = expandedId === meal.id;

        return (
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

            {isOrder && (
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={() => setExpandedId(expanded ? null : meal.id)}
                  className="text-xs text-coral bg-transparent border-none cursor-pointer p-0"
                >
                  {expanded ? '收起采购清单 ▲' : '查看采购清单 ▼'}
                </button>
                {onShare && (
                  <button
                    onClick={() => onShare(meal.id)}
                    className="text-xs text-coral-dark bg-transparent border-none cursor-pointer p-0"
                  >
                    分享
                  </button>
                )}
              </div>
            )}

            {isOrder && expanded && (
              <div className="mt-3 pt-3 border-t border-cream">
                {Object.entries(meal.groups).map(([catName, items]) => (
                  <div key={catName} className="mb-3">
                    <div className="text-xs font-semibold text-coral mb-1.5">{catName}</div>
                    {items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-1 border-b border-cream text-[13px] text-brown"
                      >
                        <span className="flex items-center gap-2">
                          <span style={{ color: item.checked ? '#7BC67E' : '#C4B998' }}>
                            {item.checked ? '✓' : '□'}
                          </span>
                          {item.name}
                        </span>
                        <span className="text-xs text-brown-light">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {showDelete && (
              <button
                onClick={() => deleteMeal(meal.id)}
                className="absolute top-4 right-4 text-xs text-muted bg-transparent border-none cursor-pointer"
              >
                删除
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
