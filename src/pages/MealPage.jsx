import React, { useState } from 'react';
import { useApp } from '../App';
import MealList from '../components/MealList';

/**
 * 食记页面
 * Meal journal page with tabs for meals and order history
 */
export default function MealPage() {
  const { meals, orders } = useApp();
  const [activeTab, setActiveTab] = useState('meals'); // 'meals' | 'orders'

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
          <MealList
            meals={meals}
            showDelete={true}
            emptyIcon="📄"
            emptyText="还没有食记，点菜下单后保存到这里"
          />
        ) : (
          <MealList
            meals={orders.map((o) => ({
              ...o,
              status: '已下单',
            }))}
            showDelete={false}
            emptyIcon="📋"
            emptyText="还没有历史订单"
          />
        )}
      </div>
    </div>
  );
}
