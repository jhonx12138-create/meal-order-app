import React, { useState } from 'react';
import { useApp } from '../App';
import MealList from '../components/MealList';

/** 订单状态展示配置 */
const STATUS_MAP = {
  pending: { label: '待采购', color: '#C4B998' },
  purchasing: { label: '采购中', color: '#E88D5A' },
  done: { label: '已完成', color: '#7BC67E' },
};

/**
 * 食记页面
 * 食记：时间线样式（回忆向）；历史订单：状态流转 + 复用 + 分享（效率向）
 */
export default function MealPage() {
  const { meals, orders, shareOrder, deleteOrder, reuseOrder, togglePurchaseCheck } = useApp();
  const [activeTab, setActiveTab] = useState('meals'); // 'meals' | 'orders'
  const [expandedId, setExpandedId] = useState(null);

  const sortedOrders = [...orders].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Tab switcher */}
      <div className="flex px-5 mb-4 flex-shrink-0">
        <button
          onClick={() => setActiveTab('meals')}
          className="flex-1 py-2 text-sm font-semibold border-b-2 transition-colors cursor-pointer bg-transparent"
          style={{
            color: activeTab === 'meals' ? '#E88D5A' : '#C4B998',
            borderColor: activeTab === 'meals' ? '#E88D5A' : 'transparent',
          }}
        >
          食记
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className="flex-1 py-2 text-sm font-semibold border-b-2 transition-colors cursor-pointer bg-transparent"
          style={{
            color: activeTab === 'orders' ? '#E88D5A' : '#C4B998',
            borderColor: activeTab === 'orders' ? '#E88D5A' : 'transparent',
          }}
        >
          历史订单
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 hide-scrollbar">
        {activeTab === 'meals' ? (
          <MealList meals={meals} emptyIcon="📖" emptyText="还没有食记，点菜下单后保存到这里" />
        ) : sortedOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
            <div className="text-[64px] mb-3">📋</div>
            <div className="text-sm text-brown-light">还没有历史订单，点菜下单后自动生成</div>
          </div>
        ) : (
          <div>
            {sortedOrders.map((order) => {
              const st = STATUS_MAP[order.status] || STATUS_MAP.pending;
              const expanded = expandedId === order.id;
              const items = Object.values(order.groups || {}).flat();
              const doneCount = items.filter((i) => i.checked).length;
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-card p-4 mb-3 shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
                >
                  {/* 头部：日期 + 状态 */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-muted">{order.date}</div>
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{ background: `${st.color}1A`, color: st.color }}
                    >
                      {st.label}
                    </span>
                  </div>

                  {/* 菜名 */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {(order.menu || []).map((dishName, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-[10px] text-xs text-brown bg-cream"
                      >
                        {dishName}
                      </span>
                    ))}
                  </div>

                  {/* 采购进度 */}
                  {order.status !== 'done' && items.length > 0 && (
                    <div className="text-[11px] text-brown-light mb-1">
                      已勾选 {doneCount}/{items.length} 项
                    </div>
                  )}

                  {/* 操作 */}
                  <div className="flex items-center gap-4 mt-1 flex-wrap">
                    <button
                      onClick={() => setExpandedId(expanded ? null : order.id)}
                      className="text-xs text-coral bg-transparent border-none cursor-pointer p-0"
                    >
                      {expanded ? '收起采购清单 ▲' : '采购清单 ▼'}
                    </button>
                    <button
                      onClick={() => reuseOrder(order.id)}
                      className="text-xs text-coral-dark bg-transparent border-none cursor-pointer p-0"
                    >
                      再点一次
                    </button>
                    <button
                      onClick={() => shareOrder(order.id)}
                      className="text-xs text-coral-dark bg-transparent border-none cursor-pointer p-0"
                    >
                      分享
                    </button>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="text-xs text-muted bg-transparent border-none cursor-pointer p-0"
                    >
                      删除
                    </button>
                  </div>

                  {/* 展开的采购清单（可勾选） */}
                  {expanded && (
                    <div className="mt-3 pt-3 border-t border-cream">
                      {Object.entries(order.groups || {}).map(([catName, catItems]) => (
                        <div key={catName} className="mb-3">
                          <div className="text-xs font-semibold text-coral mb-1.5">{catName}</div>
                          {catItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between py-1 border-b border-cream text-[13px] text-brown"
                            >
                              <span
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => togglePurchaseCheck(order.id, catName, idx)}
                              >
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
