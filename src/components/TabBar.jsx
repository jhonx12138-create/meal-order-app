import React from 'react';
import { useApp } from '../App';

const tabConfig = [
  { key: 'order', icon: '🍽️', label: '点菜' },
  { key: 'meal', icon: '📄', label: '食记' },
  { key: 'kitchen', icon: '🍳', label: '厨房' },
  { key: 'profile', icon: '👤', label: '我的' },
];

export default function TabBar() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="flex bg-white border-t border-cream flex-shrink-0 safe-bottom">
      {tabConfig.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex flex-col items-center flex-1 py-1.5 gap-0.5 transition-colors duration-200 border-none bg-transparent cursor-pointer"
            style={{ color: isActive ? '#E88D5A' : '#C4B998' }}
          >
            <span className="text-xl leading-none">{tab.icon}</span>
            <span className="text-[10px]">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
